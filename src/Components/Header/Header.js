import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(props?.count ?? count);
  }, [props?.count]);

  return (
    <>
      <div className="container">
        <img className="logo" src="/images/logo.png" alt="logo" />
        <div className="container-elements">
          <span>Product</span>
          <span>Contact</span>
          <span>Login</span>
          <Link to="/checkout">
            <span>
              <div className="countValue">{count}</div>
              <img className="cart_img" src="/images/cart.png" alt="cart" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
