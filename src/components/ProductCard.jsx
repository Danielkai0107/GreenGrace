// ProductCard.js
import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL, list, deleteObject } from "firebase/storage";
import { storage } from '../lib/firebase';

const ProductCard = ({product,toggleProduct}) => {

  const [imageSrc, setImageSrc] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const handleColorButtonClick = (index) => {
    if (selectedVariantIndex !== index) {
      setSelectedVariantIndex(index);  // 改為使用新的state
    }
  };
  
  useEffect(() => {
    fetchImages();
  }, [selectedVariantIndex]);
  const fetchImages = async () => {
    const imageName = product.variants[selectedVariantIndex].productImage;
    const imageRef = ref(storage, 'images/' + imageName);
  
    try {
      const url = await getDownloadURL(imageRef);
      setImageSrc(url);
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  };

  return (
    <li className="product-card" > 
      <ul className="addSelect-btn">
        <li onClick={(e) => {
          e.stopPropagation();
          toggleProduct({ ...product, selectedVariantIndex });
          }}
        ></li>
      </ul>
      <section className="content">
      {imageSrc && (
        <img src={imageSrc} alt="product" className="product-image" />
        )}
        <p className="name">{product.name}</p>
        <p className="price"><span>$</span>{product.price.toLocaleString()}</p>
        <p className="size">{product.sizeInfo}</p>
      </section>
      
      {product.variants && (
        <article className="color-selector-container">
          <p className="size">{product.variants[selectedVariantIndex].info} </p>
          <section className="color-showBox" style={{ backgroundColor: product.variants[selectedVariantIndex].color}}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded)
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded)
            }}
            >
              <figure></figure>
              <ul className={isExpanded ? "" : "close"}>
                {product.variants.map((variant, index) => (
                  <li
                    key={index}
                    style={{ backgroundColor: variant.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorButtonClick(index);
                      setIsExpanded(!isExpanded)
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleColorButtonClick(index);
                      setIsExpanded(!isExpanded)
                    }}
                  ><span></span></li>
                ))}
              </ul>
            </section>
        </article>
      )}
      
    </li>
  );
};

export default ProductCard;
