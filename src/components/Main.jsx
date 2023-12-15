// Main.js
import React, { useEffect, useState } from "react";
import ProductList from '../components/ProductList'
import ShowMsg from "../components/ShowMsg";
import html2canvas from "html2canvas";
import { db } from '../lib/firebase';
import { collection,onSnapshot } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { categories } from '../constants/categories';

const ContainerB = React.lazy(() => import('../components/ContainerB'));
const ContainerC = React.lazy(() => import('../components/ContainerC'));



function Main() {

  // State Hooks
  const location = useLocation();
  const [dataReady, setDataReady] = useState()
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isTopButton, setIsTopButton] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const totalSelected = selectedProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  function getCategoryIndex(categoryName) {
    const category = categories.find(cat => cat.categoryName === categoryName);
    return category ? category.categoryIndex : -1;
  }
  function sortByCategoryIndex(a, b) {
    return getCategoryIndex(a.categoryName) - getCategoryIndex(b.categoryName);
  }
  const sortedProducts = (filteredProducts ? [...filteredProducts] : []).sort(sortByCategoryIndex);
  const getUniqueCategories = () => {
    return [...new Set(sortedProducts.map((product) => product.categoryName))];
  };

  const totalPrice = selectedProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
    ).toLocaleString();

  // Handler Functions
  const toggleProduct = (product) => {
    const existingProductIndex = selectedProducts.findIndex(p => 
      p.id === product.id &&
      p.pk === totalSelected &&
      p.name === product.name && 
      p.price === product.price && 
      p.categoryIndex === product.categoryIndex && 
      p.insideIndex === product.insideIndex && 
      p.LayerSize === product.LayerSize && 
      p.color === product.variants[product.selectedVariantIndex].color &&
      p.info === product.variants[product.selectedVariantIndex].info &&
      p.productImage === product.variants[product.selectedVariantIndex].productImage &&
      p.displayImage === product.variants[product.selectedVariantIndex].productImage
    );
    if (existingProductIndex !== -1) {
      // 商品已經存在，增加數量
      setSelectedProducts(prevProducts => {
        const newProducts = [...prevProducts];
        newProducts[existingProductIndex].quantity += 1;
        return newProducts;
      });
    } else {
      // 商品不存在，添加新商品
      setSelectedProducts(prevProducts => [...prevProducts, {
        id:product.id,
        pk:totalSelected,
        name: product.name,
        price: product.price,
        categoryIndex: product.categoryIndex,
        insideIndex: product.insideIndex,
        LayerSize: product.LayerSize,
        color: product.variants[product.selectedVariantIndex].color,
        info: product.variants[product.selectedVariantIndex].info,
        productImage: product.variants[product.selectedVariantIndex].productImage,
        displayImage: product.variants[product.selectedVariantIndex].productImage,
        quantity: 1
      }]);
    }
  };
  const handleDelete = (pk) => {
    setSelectedProducts(prevProducts => prevProducts.filter(product => product.pk !== pk));  
  };
  const handleDownload = () => {
      const containerB = document.querySelector('.displayIMG-container');
    html2canvas(containerB).then(canvas => {
      const dataUrl = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'screenshot.png';
      a.click();
    });
  };
  let currentData;
  if (location.pathname === '/GreenDeco') {
    currentData = 'plants';
  } else if (location.pathname === '/WeddingDeco') {
    currentData = 'wedding';
  } else {
    currentData = 'plants';
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, currentData), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      if(data) {
        setFilteredProducts(data);
      }
      setDataReady(true);
    });
    return () => unsubscribe();
  }, [currentData]);

  
  useEffect(() => {
    const checkScrollTop = () => {
      if (!isTopButton && window.pageYOffset > 0) {
        setIsTopButton(true);
      } else if (isTopButton && window.pageYOffset <= 0) {
        setIsTopButton(false);
      }
    };
    
    window.addEventListener('scroll', checkScrollTop);
    
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [isTopButton]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    dataReady ? (
    <main> 
      <ShowMsg totalPrice={totalPrice} selectedProducts={selectedProducts}/>
      <section className="containerA" >
      {getUniqueCategories().map((category) => (
        <ProductList
            key={category}
            categoryName={category}
            products={sortedProducts.filter(
                (product) => product.categoryName === category
            )}
            selectedProducts={selectedProducts}
            toggleProduct={toggleProduct}
        />
      ))}
      </section>
      <aside className="container-for-BC">
      <React.Suspense fallback={<div className="loading-overlay"><span></span></div>}>
        <ContainerB
          selectedProducts={selectedProducts}
          handleDownload={handleDownload}
          setSelectedProducts={setSelectedProducts}
          handleDelete={handleDelete}
        />
      </React.Suspense>
      <React.Suspense fallback={<div className="loading-overlay"><span></span></div>}>
        <ContainerC
          totalSelected={totalSelected}
          totalPrice={totalPrice}
        />
        </React.Suspense>
      </aside>
      {isTopButton && <section className="to-the-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span></span>
      </section>}
      
    </main>
    ):( 
    <div className="loading-overlay"><span></span></div>
    )
    
  );
}

export default Main;
