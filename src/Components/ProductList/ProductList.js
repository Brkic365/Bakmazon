import React, { useState, useEffect } from 'react';
import "./ProductList.scss";
import Product from '../Product/Product';
import { db, auth } from '../Firebase/Firebase';

function ProductList({sortOrder, limit, search}) {

    // States

    const [products, setProducts] = useState([]);

    // Variables

    if(search != null) search = search.toLowerCase();
    let searchProducts = [];

    // Functions

    // sortOrder[0] -> sort key (orders, name, price)
    // sortOrder[1] -> sort direction (asc, desc)

    useEffect(() => {

      // Sorts products by order without any keywords
      if(search == null){
          db.collection('products').orderBy(`${sortOrder[0]}`, `${sortOrder[1]}`).limit(limit).onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({
              id: doc.id,
              product: {...doc.data(), ...{id: doc.id}}
            })))
          })
       }
       // Sorts products by order using inputed keywords
       else{
          searchProducts = [];
          db.collection('products').orderBy(`${sortOrder[0]}`, `${sortOrder[1]}`).onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
              if(doc.data().name.toLowerCase().includes(search)){
                searchProducts.push({
                  id: doc.id,
                  product: {...doc.data(), ...{id: doc.id}}
                });
              }
            })

            setProducts([]);
            setProducts(searchProducts);
          })
      }
    }, [sortOrder, limit, search])

    return (
        <div className="productlist">
            {products.length > 0 ? (
                products.map(({id, product}) => (
                    <Product key={id} product={product} />
                ))
              ): (
              <h1>Sorry, we couldn't find item:  {search}</h1>
              )
            }
        </div>
    )
}

export default ProductList