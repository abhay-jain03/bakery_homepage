import React from "react";
import "./ListItem.css";

const ListItem = (props) => {
  const { id, item, cartListing, setCartListing } = props;

  function addToCartFn(e, item, index) {
    e.preventDefault();
    if (!localStorage.getItem("tempCart")) {
      localStorage.setItem("tempCart", JSON.stringify([{ ...item }]));
      localStorage.setItem("totalCart", item.price);
      setCartListing({
        tempCart: [{ ...item }],
        totalCart: item.price,
        totalItemsInCart: [{ ...item }]?.length ?? 0
      });
    } else {
      const prevCart = JSON.parse(localStorage.getItem("tempCart"));
      let final_data = [...prevCart, { ...item }];
      localStorage.setItem("tempCart", JSON.stringify(final_data));
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
        tempCart: [...cartListing.tempCart, item],
        totalCart: totalAmount,
        totalItemsInCart: [...cartListing.tempCart, item]?.length ?? 0
      });
    }
  }

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

  return (
    <li className="prodItemBox">
      <span className="prodImage">
        <img src={item.image} alt="img" loading="lazy" />
      </span>
      <span className="prodTitle">{item.title}</span>
      <span className="prodTitle">₹{item.price}</span>
      <span className="prodTitle">{item.description}</span>
      <div className="addBtnContainer">
        {cartListing?.tempCart?.some((cartItem) => cartItem.id === item.id) ? (
          <React.Fragment>
            <button type="button">
              Added
            </button>
            <span onClick={() => deleteFromCart(item.id, id)}>
              <i className="material-icons">&#xe872;</i>
            </span>
          </React.Fragment>
        ) : (
          <button type="button" onClick={(e) => addToCartFn(e, item, id)}>
            Add To Cart
          </button>
        )}
      </div>
    </li>
  );
};

export default ListItem;
