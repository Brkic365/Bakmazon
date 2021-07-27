import React, { useState, useEffect } from 'react'
import './CartDropdown.scss'
import { auth, db } from '../Firebase/Firebase'
import CartDropdownProduct from './CartDropdownProduct/CartDropdownProduct';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

function CartDropdown() {

    // States

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);

    // Variables

    let newProducts = [];
    let newPrice = 0;

    // Functions

    useEffect(() => {
        if(!cart || Object.keys(cart).length == 0){
            setPrice(0);
            setProducts([]);
            return;
        }
        newProducts = [];
        newPrice = 0;

        let promises = Object.keys(cart).map(async (key) => {
            await db.collection("products").doc(`${key}`).get().then(snapshot => {
                newPrice += snapshot.data().price * cart[key];
                newProducts.push({product: {...snapshot.data(), ...{id: snapshot.id, amount: cart[key]}}});
            });

            return new Promise((res, rej) => {res([newPrice, newProducts])});
        })
          
        Promise.all(promises)
        .then((results) => {
          // results[0] -> price
          // results[1] -> products
  
          let productsResult = results[results.length-1][1];
          productsResult.sort((a, b) => a.product.id.localeCompare(b.product.id));
  
          setPrice(results[results.length-1][0]);
          setProducts(productsResult);
        })
    }, [cart])

    useEffect(() => {
        if(auth.currentUser){
            // Get Cart database
            db.collection("cart").doc(`${auth.currentUser.uid}`).onSnapshot(snapshot => {
                setCart(snapshot.data());       
            })  
        };
    }, [auth.currentUser])      

    return (
        <div className="cart-dropdown" style={{display: cart && Object.keys(cart).length > 0 ? "block" : "none"}}>
            <div className="cart-dropdown__content">
                {
                    products.map(({product}) => (
                        <CartDropdownProduct product={product} />   
                    )) 
                }
                <h1>${Math.round(price * 100) / 100}</h1>
                <div className="cart-dropdown__buttons">
                    <Link to="/cart">
                        <button type="text" className="cart-dropdown__cartbutton">
                            CART
                        </button>
                    </Link>
                    <Link to="/checkout">
                        <button type="text" className="cart-dropdown__checkoutbutton">
                            CHECKOUT
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartDropdown
