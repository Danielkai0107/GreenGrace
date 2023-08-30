import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { GreenLayer, WeddingLayer } from '../constants/layerMenu';
import { useLocation } from 'react-router-dom';

function ProductLayer({product,onPositionChange,position,handleDelete,setIsSelectedId,selected,handleMoveToFront,productZIndexes}) {
  
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState(null);
  let currentLayer;
  if (location.pathname === '/GreenDeco') {
    currentLayer = GreenLayer;
  } else if (location.pathname === '/WeddingDeco') {
    currentLayer = WeddingLayer;
  } else {
    currentLayer = GreenLayer;
  }

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

  useEffect(() => {
    if(product.displayImage) {
      import(`../images/${product.displayImage}`)
      .then((image) => {
        setImageSrc(image.default);
      });
    }
  }, [product.displayImage, product]);

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
