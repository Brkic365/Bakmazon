import React, { useEffect, useState } from "react";
import "./Product.scss";
import { FiHeart } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { auth, db } from "../Firebase/Firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";

function Product({ product }) {
  // States

  const [userProductDataAvailable, setUserProductDataAvailable] =
    useState(false);
  const [liked, setLiked] = useState(false);

  // Variables

  const stars = [];
  let productInCart = false;

  // Functions

  // Clean Cart database
  const cleanCartData = () => {
    const docRef = db.collection("cart").doc(`${auth.currentUser.uid}`);

    docRef.get().then((doc) => {
      Object.keys(doc.data()).forEach((key) => {
        if (doc.data()[key] === 0) {
          docRef.update({ [key]: firebase.firestore.FieldValue.delete() });
        }
      });
    });
  };

  // Sync like state and like data

  const syncLikeData = () => {
    db.collection("products")
      .doc(`${product.id}`)
      .collection("user-settings")
      .doc(`${auth.currentUser.uid}`)
      .get()
      .then((snapshot) => {
        try {
          setLiked(snapshot.data().liked === "true");
        } catch {
          setLiked(false);
        }
      });
  };

  useEffect(() => {
    syncLikeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Finds the instance of current product in database, and adds one to the current amount
  const updateCart = (e) => {
    if (!auth.currentUser) return;

    db.collection("cart")
      .doc(`${auth.currentUser.uid}`)
      .update({ [product.id]: firebase.firestore.FieldValue.increment(1) });

    cleanCartData();
  };

  const generateProductCart = () => {
    db.collection("cart")
      .doc(`${auth.currentUser.uid}`)
      .get()
      .then((snapshot) => {
        try {
          // eslint-disable-next-line no-negated-in-lhs
          if (!product.id in Object.keys(snapshot.data())) {
            db.collection("cart")
              .doc(`${auth.currentUser.uid}`)
              .set({ [product.id]: 0 });
          } else {
            productInCart = true;
          }
        } catch {
          db.collection("cart")
            .doc(`${auth.currentUser.uid}`)
            .set({ [product.id]: 0 });
        }

        cleanCartData();
      });
  };

  const handleLike = () => {
    if (!userProductDataAvailable) {
      db.collection("products")
        .doc(`${product.id}`)
        .collection("user-settings")
        .get()
        .then((snapshot) => {
          try {
            if (snapshot.doc.indexOf(`${auth.currentUser.uid}`) === -1) {
              db.collection("products")
                .doc(`${product.id}`)
                .collection("user-settings")
                .doc(`${auth.currentUser.uid}`)
                .set({ liked: `${!liked}` });
            }
          } catch {
            db.collection("products")
              .doc(`${product.id}`)
              .collection("user-settings")
              .doc(`${auth.currentUser.uid}`)
              .set({ liked: `${!liked}` });
          }

          setUserProductDataAvailable(true);
          setLiked(!liked);
        });
    } else {
      db.collection("products")
        .doc(`${product.id}`)
        .collection("user-settings")
        .doc(`${auth.currentUser.uid}`)
        .update({ liked: `${!liked}` });
      setLiked(!liked);
    }
  };

  // Generate n full stars and fill the rest with empty stars

  for (let i = 0; i < 5; i++) {
    stars.push(
      i < product.stars ? (
        <AiFillStar size="2.5em" color="#EB5E55" />
      ) : (
        <AiOutlineStar size="2.5em" color="#EB5E55" />
      )
    );
  }

  // If there is no instance of product in cart database, generate it

  if (!productInCart) generateProductCart();

  return (
    <div className="product">
      <div className="product__heartcontainer">
        <FiHeart
          className="product__heart"
          fill={`${liked ? `#EB5E55` : `none`}`}
          size="0.8em"
          onClick={handleLike}
        />
      </div>

      <img src={product.imgUrl} alt="product" />

      <h1>{product.name}</h1>

      <div className="product__stars">{stars}</div>

      {product.oldPrice ? (
        <div className="product__price">
          <div
            className="product__discountprice"
            style={{ height: "2em", marginTop: "0" }}
          >
            <p style={{ textDecoration: "line-through 2.5px" }}>
              ${product.oldPrice}
            </p>
            <p>
              -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
            </p>
          </div>

          <h3 style={{ color: "#EB5E55" }}>${product.price}</h3>
        </div>
      ) : (
        <div className="product__price" style={{ marginTop: "1em" }}>
          <h3 style={{ color: "black" }}>
            {product.price > 0 ? "$" + product.price : "FREE"}
          </h3>
        </div>
      )}

      <div className="product__buttons">
        <div className="product__details">
          <Link
            style={{ textDecoration: "none", color: "#EB5E55" }}
            to={`/product/${product.id}`}
          >
            <h4>DETAILS</h4>
          </Link>
        </div>
        <div className="product__cart" onClick={updateCart}>
          <IoMdCart className="product__cartimg" />
          <h4>CART</h4>
        </div>
      </div>
    </div>
  );
}

export default Product;
