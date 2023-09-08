import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { GreenLayer, WeddingLayer } from '../constants/layerMenu';
import { useLocation } from 'react-router-dom';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../lib/firebase';

function ProductLayer({product,onPositionChange,position,handleDelete,setIsSelectedId,selected,handleMoveToFront,productZIndexes}) {
  
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState(null);
  const imageName = product.productImage;
  let currentLayer;
  let currentIMG;
  if (location.pathname === '/GreenDeco') {
    currentLayer = GreenLayer;
    currentIMG = 'PlantIMG/';
  } else if (location.pathname === '/WeddingDeco') {
    currentLayer = WeddingLayer;
    currentIMG = 'WeddingIMG/';
  } else {
    currentLayer = GreenLayer;
    currentIMG = 'PlantIMG/';
  }

  useEffect(() => {
    fetchImages();
  }, [imageName]);
  
  const fetchImages = async () => {
    const imageRef = ref(storage, currentIMG + imageName);
  
    try {
      const url = await getDownloadURL(imageRef);
      setImageSrc(url);
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  };

  const layerSize = currentLayer.find(item => item.id === product.categoryLayer);

  const handleStop = (e, data) => {
    onPositionChange({ x: data.x, y: data.y });
    setIsSelectedId(product.pk);
    handleMoveToFront()
  };
  const handleDeleteWithPrevent = (e, pk) => {
    e.preventDefault();
    e.stopPropagation();
    handleDelete(pk);
  };

  return (
    <Draggable 
      bounds="parent" 
      {...layerSize.axis}
      position={position}
      onStop={handleStop}
    >
      <ul
        className={`layer-container ${layerSize.className} ${selected ? 'selected' : ''}`}
        style={{ 
          width: layerSize.width,
          aspectRatio: layerSize.ratio,
          backgroundImage: `url(${imageSrc})`,
          zIndex: productZIndexes[product.pk] || 0
        }} // 在点击时调用 handleMoveToFront 函数
        onClick={(e)=>{setIsSelectedId(product.pk)}}
      >
        {selected &&  <ul className='edit-btn'>
        <li onClick={(e) => {handleDeleteWithPrevent(e, product.pk);}} onTouchStart={(e) => {handleDeleteWithPrevent(e, product.pk);}}></li>

        </ul>}
      </ul>
    </Draggable>
  );
}

export default ProductLayer;
