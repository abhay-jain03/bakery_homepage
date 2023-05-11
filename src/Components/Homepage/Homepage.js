import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Products from "./Product.json";
import ListItem from "../ListItem/ListItem";
import Footer from "../Footer/Footer";

const Homepage = (props) => {
  const [prodList, setProdList] = useState([]);
  const [cartListing, setCartListing] = useState({
    tempCart: [],
    totalCart: 0,
    totalItemsInCart: JSON.parse(localStorage.getItem("tempCart"))?.length ?? 0
  });

  useEffect(() => {
    setProdList(Products);
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tempCart"))?.length) {
      setCartListing({ 
        tempCart: JSON.parse(localStorage.getItem("tempCart")) ?? [],
        totalCart: JSON.parse(localStorage.getItem("totalCart")) ?? 0,
        totalItemsInCart: JSON.parse(localStorage.getItem("tempCart"))?.length ?? 0,
      });
    }
  }, [cartListing.totalItemsInCart]);

  return (
    <>
      <Header count={cartListing.totalItemsInCart} />
      <div className="middleContainer">
        <img src="/images/topBanner.png" alt="img" width="100%" />
        <Banner />
        <div className="product_container">
          <h4 className="product_heading">New Products</h4>
          <div className="line1">♠</div>
          <ul className="product_listing">
            {(prodList?.length ? prodList : [])?.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  item={item}
                  id={index}
                  cartListing={cartListing}
                  setCartListing={setCartListing}
                />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
