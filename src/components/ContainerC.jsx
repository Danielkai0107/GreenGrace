import React from 'react';


function ContainerC({ totalPrice, totalSelected}) {




return (
  <section className="containerC">
    <ul className='price-container'>
      <p>佈置總金額：</p>
      <section className="total-price">${totalPrice}</section>
    </ul>
    <ul className='second-container'>
      <li className='info'>
        <h3 className="total-num">共計 {totalSelected} 項</h3>
        <p>＊不包含進、撤場人力</p>
        <p>＊詳細報價請私訊我們</p>
      </li>
      <a href="/" className='Connect' >
        <figure></figure>
        <p>聯絡我們</p>
      </a>
    </ul>
  </section>
)
}

export default ContainerC
