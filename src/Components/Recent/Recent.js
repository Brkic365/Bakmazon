import React, { useState, useEffect } from 'react'
import Product from '../Product/Product'
import "./Recent.scss";
import {db} from "../Firebase/Firebase";

const products = [{
    imgUrl: "https://cdn.vox-cdn.com/thumbor/pjcUw1kyqVQA8sbGFd1mz2g9pog=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22406771/Exbfpl2WgAAQkl8_resized.jpeg",
    name: "Shoes",
    price: "100",
    description: "Lil nas X"
  },
  {
    imgUrl: "https://i.imgur.com/OFL0HFV.png",
    name: "Shoes",
    price: "100",
    description: "Cum"
  },
  {
    imgUrl: "https://i.imgur.com/NLsbMVQ.png",
    name: "Shoes",
    price: "100",
    description: "Amogus"
  },
  {
    imgUrl: "https://i.imgur.com/SU31MCk.png",
    name: "Shoes",
    price: "100",
    description: "Kriper 1s"
  },
  {
    imgUrl: "https://i.imgur.com/VOc0lnH.jpg",
    name: "Shoes",
    price: "100",
    description: "Joker"
  },
]

function Recent() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection('products').orderBy('orders', 'desc').onSnapshot(snapshot => {
      setProducts(snapshot.docs.map(doc => ({
        id: doc.id,
        product: doc.data()
      })))
    })
  }, [])

  return (
      <div className="trending">
          <div className="trending-header">
              <h1>Recent Deals</h1>
              <h4>See all</h4>
          </div>
          <div className="trending-content">
              {
                products.map(({id, product}) => (
                  <Product key={id} product={product} />
                ))
              }
          </div>
      </div>
  )
}

export default Recent
