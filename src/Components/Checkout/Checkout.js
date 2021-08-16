import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import CustomInput from "../CustomInput/CustomInput";
import { db, auth } from "../Firebase/Firebase";

function Checkout() {
  // States

  const [shipping] = useState(125);
  const [taxes] = useState(15.25);
  const [inputValues, setInputValues] = useState({});
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Variables

  const namesList = [
    ["First Name", "Last Name"],
    "Address",
    ["ZIP", "Email Address"],
    ["Country", "Town/City"],
    ["Company name (optional)", "Phone (optional)"],
  ];
  let newPrice = 0;

  // Functions

  const handleCallback = (data) => {
    setInputValues({ ...inputValues, ...data });
    console.log(inputValues);
  };

  // Get the price
  useEffect(() => {
    if (!cart || Object.keys(cart).length === 0) {
      setPrice(0);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newPrice = 0;

    let promises = Object.keys(cart).map(async (key) => {
      await db
        .collection("products")
        .doc(`${key}`)
        .get()
        .then((snapshot) => {
          newPrice += snapshot.data().price * cart[key];
        });

      return new Promise((res, rej) => {
        res(newPrice);
      });
    });

    Promise.all(promises).then((newPrices) => {
      setPrice(newPrices[newPrices.length - 1]);
    });
  }, [cart]);

  useEffect(() => {
    if (auth.currentUser) {
      // Get Cart database
      db.collection("cart")
        .doc(`${auth.currentUser.uid}`)
        .onSnapshot((snapshot) => {
          setCart(snapshot.data());
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  // Get Discount
  useEffect(() => {
    if (auth.currentUser) {
      db.collection("discountCodes")
        .doc("codes")
        .collection("appliedCodes")
        .doc(`${auth.currentUser.uid}`)
        .onSnapshot((snapshot) => {
          setDiscount(Object.values(snapshot.data())[0]);
        });
    }
  }, []);

  return (
    <div className="checkout">
      <div className="checkout__title">
        <h1>Checkout</h1>
      </div>
      <div className="checkout__content">
        <div className="checkout__myInfo">
          <h2>Billing Details</h2>
          {namesList.map((names) => (
            <CustomInput names={names} parentCallback={handleCallback} />
          ))}
        </div>
        <div className="checkout__summary">
          <h2>Summary</h2>
          <div className="checkout__content">
            <div className="checkout__subtotal">
              <h3>Subtotal</h3>
              <div className="checkout__subtotal-price">
                {discount === 0 ? null : discount > 0 ? (
                  <p>(-{discount}%)</p>
                ) : discount < 0 ? (
                  <p>(+{Math.abs(discount)}%)</p>
                ) : null}
                <h3>${price - price * (discount / 100)}</h3>
              </div>
            </div>
            <div className="checkout__addin">
              <h3>Shipping & Handling</h3>
              <h3>${shipping}</h3>
            </div>
            <div className="checkout__addin">
              <h3>Taxes</h3>
              <h3>${taxes}</h3>
            </div>
            <div className="checkout__total">
              <h1>Total</h1>
              <h1>${price - price * (discount / 100) + shipping + taxes}</h1>
            </div>
          </div>
          <div className="checkout__buttons">
            <button type="text">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
