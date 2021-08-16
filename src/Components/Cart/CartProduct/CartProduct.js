import React, { useState } from "react";
import "./CartProduct.scss";
import { FaTrashAlt } from "react-icons/fa";
import { db, auth } from "../../Firebase/Firebase";
import firebase from "firebase";

function CartProduct({ product, border }) {
  // States

  const [amount, setAmount] = useState(product.amount);

  // Variables

  let borderBottom = border ? "1px solid lightgray" : "none";

  // Functions

  const handleAmountChange = (e) => {
    if (e.target.value < 1) {
      e.target.value = 1;
      return;
    }
    setAmount(Number(e.target.value));

    db.collection("cart")
      .doc(`${auth.currentUser.uid}`)
      .update({ [product.id]: Number(e.target.value) });
  };

  const handleDelete = () => {
    db.collection("cart")
      .doc(`${auth.currentUser.uid}`)
      .update({ [product.id]: firebase.firestore.FieldValue.delete() });
  };

  return (
    <div className="cart-product" style={{ borderBottom: `${borderBottom}` }}>
      <div className="cart-product__main">
        <div className="cart-product__img-name">
          <img
            src={product ? product.imgUrl : "No data"}
            alt={product.imgUrl}
          />
          <h3>{product ? product.name : "No data"}</h3>
        </div>
        <input
          type="text"
          defaultValue={product ? product.amount : 0}
          onChange={handleAmountChange}
        />
        <h4>
          {product
            ? product.price > 0
              ? "$" + product.price * amount
              : "FREE"
            : "No data"}
        </h4>
      </div>
      <FaTrashAlt className="cart-product__trash" onClick={handleDelete} />
    </div>
  );
}

export default CartProduct;
