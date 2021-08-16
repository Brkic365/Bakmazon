import React, { useState } from "react";
import "./StoreItems.scss";
import ProductList from "../ProductList/ProductList";

function StoreItems({ search }) {
  // States

  const [sortOrder, setSortOrder] = useState(["orders", "desc"]);
  const [itemNumber, setItemNumber] = useState(12);

  // Variables

  console.log("Search in store items is: " + search);

  const sortOrderPairs = {
    Popularity: ["orders", "desc"],
    "Price: High - Low": ["price", "desc"],
    "Price: Low - High": ["price", "asc"],
    Newest: ["timestamp", "desc"],
    "Title: A - Z": ["name", "asc"],
    "Title: Z - A": ["name", "desc"],
  };

  // Functions

  const handleSortOrderChange = (e) => {
    setSortOrder(sortOrderPairs[e.target.value]);
  };

  const handleNumberChange = (e) => {
    setItemNumber(e.target.value);
  };

  return (
    <div className="storeitems">
      <div className="store-header">
        <div className="per-page">
          <h5>Per page</h5>
          <select onChange={handleNumberChange}>
            <option>12</option>
            <option>24</option>
            <option>36</option>
          </select>
        </div>
        <div className="sort-by">
          <h5>Sort by</h5>
          <select onChange={handleSortOrderChange}>
            <option>Popularity</option>
            <option>Price: Low - High</option>
            <option>Price: High - Low</option>
            <option>Newest</option>
            <option>Title: A - Z</option>
            <option>Title: Z - A</option>
          </select>
        </div>
      </div>
      <div className="store-main">
        <ProductList
          sortOrder={sortOrder}
          limit={itemNumber}
          search={search ? search : null}
        />
      </div>
    </div>
  );
}

export default StoreItems;
