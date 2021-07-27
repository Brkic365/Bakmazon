import React, { useState, useEffect } from 'react';
import "./Trending.scss";
import Product from '../Product/Product';
import { db } from '../Firebase/Firebase';

function Trending() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      db.collection('products').orderBy('orders', 'desc').onSnapshot(snapshot => {
        setProducts(snapshot.docs.map(doc => ({
          id: doc.id,
          product: {...doc.data(), ...{id: doc.id}}
        })))
      })
    }, [])

    return (
        <div className="trending">
            <div className="trending-content">
                {
                  products.map(({id,product}) => (
                    <Product key={id} product={product} />
                  ))
                }
            </div>
        </div>
    )
}

export default Trending
