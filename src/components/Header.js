import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import cart from "../assets/cart.svg";
import "../assets/navbar.css";
import dropdown from "../assets/dropdown.svg";
import { useLocation } from "react-router-dom";
import "./component.css";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      {location.pathname === "/iuyf" ? null : (
        <nav className="navbar">
          <div className="nav-center">
            <Link to="/" style={{ color: "white", fontSize: "40px" }}>
              ShopKart
              {/* <img
                src="https://static.vecteezy.com/system/resources/previews/028/071/362/non_2x/shop-logo-with-bag-icon-for-e-commerce-and-store-logo-vector.jpg"
                alt="logo"
                className="logo"
              /> */}
            </Link>

            <ul className="nav-links">
              {userInfo ? (
                <div className="info">
                  <>
                  <Link style={{ color: "white" }} to="/compare">
                    Compare
                  </Link>
                    <Link style={{ color: "white" }} to="/favourites">
                      Favourites
                    </Link>
                    <Link style={{ color: "white" }} to="/">
                      Products
                    </Link>
                  </>
                  <button className="info-button">
                    Hi! {userInfo.name.split(" ")[0]}{" "}
                    <img src={dropdown} alt="" />
                  </button>
                  <ul>
                    <li>
                      <Link to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <p onClick={logoutHandler} className="logout">
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link style={{ color: "white" }} to="/compare">
                    Compare
                  </Link>
                  <Link style={{ color: "white" }} to="/">
                    Products
                  </Link>
                  <Link style={{ color: "white" }} to="/login">
                    SignIn
                  </Link>
                </>
              )}
              <li>
                <Link style={{ color: "white" }} to="/cart">
                  <img src={cart} alt="" width={"48px"} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
