import React, { useEffect, useState }from "react";
import "./Cart.scss";
import CartProduct from "./CartProduct/CartProduct";
import { db, auth } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import Discount from "./Discount/Discount";

function Cart() {

  // States
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

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
  
  // Get Discount
  useEffect(() => {
    if(auth.currentUser){
      db.collection("discountCodes").doc("codes").collection("appliedCodes").doc(`${auth.currentUser.uid}`).onSnapshot(snapshot => {
        setDiscount(Object.values(snapshot.data())[0]);
      })
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="cart">
      <h1>My Cart</h1>
      <div className="cart__content">
        <div className="cart__products">
          <div className="cart__top-bar">
            <h3>Product</h3>
            <h3 className="cart__amount">Amount</h3>
            <h3>Price</h3>
          </div>
          {
            products.map(({product}, i) => (
              <CartProduct product={product} border={!(i == products.length - 1)}/>
            ))
          }
        </div>

        <div className="cart__summary">
          <div className="cart__top-bar">
            <h3>Summary</h3>
          </div>

          <div className="cart__total-discount">
            <div className="cart__total">
              <h3>Total</h3>
              <div className="cart__total-price">
                {
                  discount  == 0 ? null :
                  discount > 0 ? <p>(-{discount}%)</p> : 
                  discount < 0 ? <p>(+{Math.abs(discount)}%)</p> : null
                }    
                <h3>${price - (price * (discount/100))}</h3>
              </div>
            </div>  

            <Discount price={price} />      
          </div>

          <Link to="/checkout"><button className="cart__checkout" type="submit">Checkout</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
