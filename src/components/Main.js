import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [value, setValue] = useState("");
  const getData = () => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function getValue(val) {
    let arr = [];
    products.forEach((items) => {
      var filteredData = items.caption + items.description + items.id;
      if (filteredData.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        arr.push(items);
      }
    });
    setFilteredProducts(arr);
  }
  
  useEffect(() => {
    getValue(value);
  }, [value]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="main">
      <input
        type="search"
        placeholder="Search"
        value={value}
        className="inputTop"
        onChange={(e) => setValue(e.target.value)}
      />

      {filteredProducts.map((e) => {
        return (
          <div key={e.id} className="product_place">
            <div className="inform">
              <span className="id" id="id">
                {e.id}
              </span>
              <span>|</span>
              <span className="count" id="count">
                {e.rating}
              </span>
            </div>
            <span className="left">
              <img id="img" src={e.imageurl} alt="pictures of products" />
            </span>
            <div className="mid">
              <span className="product_title" id="title">
                {e.caption.slice(0, 25)} ...
                <span id="price">{e.price}</span>
              </span>
              <span className="product_description" id="descrip">
                {e.description.slice(0, 200)} ...
              </span>
              <span className="product_category" id="category">
                {e.category}
              </span>
            </div>
            <div className="right">
              <span className="rating">{e.rating}</span>
              <button>More Info</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
