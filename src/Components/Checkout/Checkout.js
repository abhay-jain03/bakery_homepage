import React, { useState, useEffect } from "react";
import "./Checkout.css";

const Checkout = (props) => {
  const [cartListing, setCartListing] = useState({
    tempCart: [],
    totalCart: 0,
    totalItemsInCart: 0,
  });

  useEffect(() => {
    if (!JSON?.parse(localStorage?.getItem("tempCart"))?.length) return;
    setCartListing({
      tempCart: JSON?.parse(localStorage?.getItem("tempCart")) ?? [],
      totalCart: JSON?.parse(localStorage?.getItem("totalCart")) ?? 0,
      totalItemsInCart: JSON?.parse(localStorage?.getItem("tempCart"))?.length ?? 0
    });
  }, [cartListing?.totalItemsInCart]);

  function deleteFromCart(id, index) {
    const prevCart = JSON.parse(localStorage.getItem("tempCart"));
    prevCart.splice(
      prevCart.findIndex((i) => i.id === id),
      1
    );
    localStorage.setItem("tempCart", JSON.stringify(prevCart));
    const totalAmount = JSON.parse(localStorage.getItem("tempCart")).reduce(
      function (newTotal, item) {
        if (item.price) {
          newTotal = Number(Number(newTotal) + Number(item.price));
        }
        return newTotal;
      },
      []
    );
    localStorage.setItem("totalCart", totalAmount);
    setCartListing({
      tempCart: JSON.parse(localStorage.getItem("tempCart")),
      totalCart: totalAmount,
      totalItemsInCart:
        JSON.parse(localStorage.getItem("tempCart"))?.length ?? 0
    });
  }

  console.log(cartListing);

  return (
    <>
      <section className="checkout_container">
        <header className="checkout_header">
          <span className="back_arrow" onClick={() => history.back()}>&#x2190;</span>
          <span>Checkout</span>
        </header>

        <div className="checkout_middle_container">
          <h2>Cart</h2>
          <ul className="checkout_ul">
            {cartListing?.tempCart?.length ? cartListing?.tempCart?.map((list, index) => (
              <li key={index} className="checkout_li">
                <img src={list?.image} alt="img" />
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <span>Title : {list?.title}</span>
                  <span>Id: {list?.title}</span>
                  <span>Price: {list?.price}</span>
                </div>
                <div className="checkout_delete_icon" onClick={(e) => deleteFromCart(list?.id, index)}>
                  <i className="material-icons">&#xe872;</i>
                </div>
              </li>
            )) : (
              <div>Your Cart is Empty!</div>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Checkout;
