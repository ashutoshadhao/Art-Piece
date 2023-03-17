import React from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../images/logo1.png"
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light border-bottom navbar-me-level-0 ">
        <div className=" container-fluid pe-lg-2 p-0  ">
          <Link className="navbar-brand fs-4 ms-4  " to="/">
            <img className="logo-navbar" src={logo} alt="logo" />
          </Link>
          <Link className="navbar-brand title-me-navbar fw-bold fs-4  text-focus-in zoom" to="/">
            <span className="" style={{  color: "red" }}>A</span>rt -  <span style={{ color: "red" }}>P</span>iece
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link pe-3 me-4 fw-bold "
                  aria-current="page"
                  to="/"
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link pe-3 me-4 fw-bold" to="/products">
                  PRODUCTS
                </NavLink>
              </li>

              {isAuthenticated ? <li className="nav-item">
                <NavLink className="nav-link pe-3 me-4 fw-bold" to="/login">
                  ACCOUNT
                </NavLink>
              </li> : <li className="nav-item"></li>}

              <li className="nav-item">
                <NavLink className="nav-link pe-3 me-4 fw-bold" to="/cart">
                  CART
                  <span className="badge badge-warning" id="lblCartCount">
                    {cartItems.length}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link pe-3 me-4 fw-bold" to="/contact">
                  CONTACT
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link pe-3 me-4 fw-bold" to="/about">
                  ABOUT
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav icons ms-auto mb-2 mb-lg-0">

            </ul>
          </div>
          {!isAuthenticated ? <button className="btn-me-navbar rotate-in-center m-2 ">
            <NavLink className="nav-link fw-bold" to="/login">
              LOGIN
            </NavLink>
          </button> : null}
        </div>
      </nav>
    </>
  );
};

export default Header;
