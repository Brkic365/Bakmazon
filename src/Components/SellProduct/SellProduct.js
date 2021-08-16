import React, { createRef, useState } from "react";
import "./SellProduct.scss";
import firebase from "firebase";
import { db, storage } from "../Firebase/Firebase";

function SellProduct() {
  // States

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  // Refs

  const urlInput = createRef("");
  const nameInput = createRef("");
  const descriptionInput = createRef("");
  const categoryInput = createRef("");
  const priceInput = createRef("");

  const refs = [
    urlInput,
    nameInput,
    descriptionInput,
    categoryInput,
    priceInput,
  ];

  // Functions

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        // While uploading
        (snapshot) => {
          // Progress update
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        // Error handling
        (error) => {
          console.log(error);
          alert("Failed to upload. Please try again.");
        },
        // Complete
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              pushToDatabase(url);
            });
        }
      );
    } else {
      pushToDatabase(imgUrl);
    }
  };

  const pushToDatabase = (url) => {
    db.collection("products").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      imgUrl: url,
      name: name,
      description: description,
      category: category,
      stars: 0,
      orders: 0,
      price: Number(price),
    });

    setProgress(0);
    setImage(null);

    // eslint-disable-next-line array-callback-return
    refs.map((ref) => {
      ref.current.value = "";
    });
  };

  return (
    <div className="sell">
      <div className="sell__content">
        <h1>SELL YOUR PRODUCT</h1>
        <div className="sell__details">
          <form className="sell__form">
            <div className="sell__name-form sell__form-component">
              <label htmlFor="name">Product Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                ref={nameInput}
                type="text"
                id="name"
              />
            </div>

            <div className="sell__price-form sell__form-component">
              <label htmlFor="price">Price:</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                ref={priceInput}
                type="number"
                id="price"
              />
            </div>

            <div className="sell__category-form sell__form-component">
              <label htmlFor="category">Product Category:</label>
              <input
                onChange={(e) => setCategory(e.target.value)}
                ref={categoryInput}
                type="text"
                id="category"
              />
            </div>

            <div className="sell__details-form sell__form-component">
              <label htmlFor="details">Product Details:</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                ref={descriptionInput}
                type="text"
                id="details"
                rows="6"
                cols="10"
              />
            </div>
          </form>

          <div className="sell__image-drop">
            <h2>Drag image here</h2>
            <input
              type="file"
              onChange={handleImageUpload}
              className="sell__file-upload"
            />
            <progress value={progress} max="100" className="sell__progress" />

            <label htmlFor="imgurl">Image url:</label>
            <input
              onChange={(e) => setImgUrl(e.target.value)}
              ref={urlInput}
              type="text"
              id="imgurl"
            />
          </div>
        </div>
        <button type="submit" className="sell__submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default SellProduct;
