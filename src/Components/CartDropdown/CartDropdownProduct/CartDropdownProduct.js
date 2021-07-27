import React from 'react'
import './CartDropdownProduct.scss'

function CartDropdownProduct({product}) {

    if(product.name.length > 13) product.name = product.name.substring(0, product.name.substring(0, 13).lastIndexOf(' ')) + "...";

    return (
        <div className="cartdropdownproduct">
            <img src={product.imgUrl} alt="product" />
            <div className="cartdropdownproduct__name-price">
                <h2>{product.name}</h2>
                <p>${product.price}</p>
            </div>
            <h5>{product.amount}</h5>
        </div>
    )
}

export default CartDropdownProduct
