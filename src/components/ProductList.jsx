// ProductList.js
import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ categoryName, products, selectedProducts, toggleProduct}) => {
  const productListRef = useRef(null);
  const updateSelectedVariantIndex = (productId, variantIndex) => {
    const updatedProduct = selectedProducts.find((product) => product.id === productId);
    if (updatedProduct) {
      toggleProduct({ ...updatedProduct, selectedVariantIndex: variantIndex });
    }
  };
  const selectedCount = selectedProducts.filter((selectedProduct) =>
    products.some((product) => product.id === selectedProduct.id)
  ).length;
  const sortByPrice = (products) => {
    return products.slice().sort((a, b) => a.price - b.price);
  };
  const categoryNameEn = products[0].categoryNameEn

  useEffect(() => {
    if (productListRef.current) {
      productListRef.current.scrollLeft += 90;
    }
  }, []);

  return (
    <section className="product-list">
      <ul className="product-list-header" >
        <li className="product-list-header-title">
          <p>{categoryName}</p>
          <span>｜</span>
          <span>{categoryNameEn}</span>
        </li>
        <li className="product-list-header-info">
          {selectedCount > 0 && (
            <p className="selectedInfo"><span className="dot"></span> {selectedCount}</p>
          )}
        </li>
        
      </ul>
      <ul className="product-list-items" ref={productListRef}>
        {products.length > 0 ? (
          sortByPrice(products).map((product) => {
            const selectedProduct = selectedProducts.find(
              (p) => p.id === product.id
            );
            return (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={!!selectedProduct}
                selectedVariantIndex={selectedProduct?.selectedVariantIndex || 0}
                toggleProduct={toggleProduct}
                updateSelectedVariantIndex={updateSelectedVariantIndex}
              />
            );
          })
        ) : (
          <h4 className="op-6">暫時沒有相關道具</h4>
        )}
      </ul>
    </section>
  );
};

export default ProductList;
