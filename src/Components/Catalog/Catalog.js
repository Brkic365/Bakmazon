import React from 'react'
import './Catalog.scss'

function Catalog({products}) {
    return (
        <div className="catalog-header"> 
            <h1>All Products</h1>
            <h5>Found {products.length} products</h5>
        </div>
    )
}

export default Catalog
