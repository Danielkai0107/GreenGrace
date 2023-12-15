// ContainerB.js
import React, {  useEffect, useState } from "react";
import ProductLayer from "./ProductLayer";
import { useLocation } from "react-router-dom";
import { GreenBgc, WeddingBgc } from "../constants/decoBgc";



const ContainerB = ({ 
  selectedProducts,setSelectedProducts,handleDownload,handleDelete }) => {

  const [imageSrc, setImageSrc] = useState(null);
  const [bgcList, setBgcList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productPositions, setProductPositions] = useState({});
  const [isSelectedId, setIsSelectedId] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(0);
  const location = useLocation();
  
  const handleMoveToFront = (pk) => {
    setProductPositions((prevPositions) => ({
      ...prevPositions,
      [pk]: {
        ...prevPositions[pk],
        zIndex: zIndexCounter
      }
    }));
    setZIndexCounter(zIndexCounter + 1);
  };

  //清除按鈕功能
  const handleClearSelect = () => {
    if (selectedProducts.length > 0) {
      setProductPositions({});
      setSelectedProducts([]);
      localStorage.setItem("selectedProducts", JSON.stringify([]));
    }
  };
  const handleBackgroundChange = (direction) => {
    if (direction === 'pre') {
      setCurrentImageIndex((currentImageIndex - 1 + bgcList.length) % bgcList.length);
    } else if (direction === 'next') {
      setCurrentImageIndex((currentImageIndex + 1) % bgcList.length);
    }
  };
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        setBgcList((oldList) => {
            const newList = [...oldList, url];
            setCurrentImageIndex(newList.length - 1);
            return newList;
        });
      }
  };
  
  //背景圖片讀取
  useEffect(() => {
    const currentImage = bgcList[currentImageIndex];
    if (currentImage) {
        if (currentImage.startsWith('blob:')) {
            setImageSrc(currentImage);
        } else {
            import(`../images/${currentImage}`)
            .then((image) => {
                setImageSrc(image.default);
            });
        }
    } else {
        setImageSrc(null); 
      }
  }, [bgcList, currentImageIndex]);

  //取消選取功能
  useEffect(() => {
    const handlePageClick = (event) => {
      if (!event.target.closest(".layer-container")) {
        setIsSelectedId(null);
      }
    };
    document.addEventListener("click", handlePageClick);
    return () => {
      document.removeEventListener("click", handlePageClick);
    };
  }, []);

  //判斷不同網址選擇背景
  useEffect(() => {
    if (location.pathname === "/GreenDeco") {
        setBgcList(GreenBgc);
    } else if (location.pathname === "/WeddingDeco") {
        setBgcList(WeddingBgc);
      }
  }, [location.pathname]);
  
  return (
    <article className="containerB">
      <section className="containerB-btn">
        <span className='clearBtn' onClick={handleClearSelect} onTouchStart={handleClearSelect}>清空</span>
        {/* <label htmlFor="upload-input" className="upload-btn1">上傳</label> */}
        <input id="upload-input" className="upload-btn2" type="file" accept="image/*" onChange={handleUpload}/>
        {/* <span className="download-btn" onClick={handleDownload} onTouchStart={handleDownload}></span> */}
      </section>
      <span className="bgcChanger-btn1" 
      onClick={() => handleBackgroundChange('pre')}
      ></span>
      <span className="bgcChanger-btn2" 
      onClick={() => handleBackgroundChange('next')}
      ></span>
      <section className="displayIMG-container" style={{ backgroundImage: `url(${imageSrc})`}}>
        {
          selectedProducts
            .sort((a, b) => {
              if (a.categoryIndex !== b.categoryIndex) {
                return a.categoryIndex - b.categoryIndex;
              } else {
                return a.insideIndex - b.insideIndex;
              }
            })
            .flatMap((selectedProduct) => {
              const productQuantity = selectedProduct.quantity || 1;

              return Array(productQuantity).fill().map((_, i) => (
                <ProductLayer
                  key={selectedProduct.pk} // 增加索引以避免重复的键
                  product={{
                    ...selectedProduct,
                    categoryIndex: selectedProduct.categoryIndex,
                    categoryLayer:selectedProduct.LayerSize,
                  }}
                  handleBackgroundChange={handleBackgroundChange}
                  position={productPositions[selectedProduct.pk]}
                  onPositionChange={(newPosition) => {
                  setProductPositions((prevPositions) => ({
                    ...prevPositions,
                    [selectedProduct.pk]: newPosition,
                  }));
                  }}
                  handleDelete={handleDelete}
                  setIsSelectedId={setIsSelectedId}
                  selected={isSelectedId === selectedProduct.pk}
                  handleMoveToFront={() => handleMoveToFront(selectedProduct.pk)}
                />
              ));
            })
        }
      </section>
    </article>
  );
};

export default ContainerB;
