import React from 'react'

function ShowMsg({totalPrice,selectedProducts}) {
  return (
    <ul className='show-message'>
      {selectedProducts.length > 0 && 
      <li>
        <p>目前金額:</p>
        <span>$ {totalPrice}</span>
      </li>}
      
    </ul>
  )
}

export default ShowMsg
