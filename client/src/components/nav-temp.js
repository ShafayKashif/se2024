import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logoImage from "../styles/logo.png";
import settingImage from "../styles/settings.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = window.sessionStorage.getItem("role");

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="navbar-links">
        {role === "customer" && (
          <>
            <button
              className={location.pathname === "/CustomerHome" ? "active" : ""}
              onClick={() => handleNavigate("/CustomerHome")}
            >
              Homepage
            </button>
            <button
              className={location.pathname === "/CurrentOrder" ? "active" : ""}
              onClick={() => handleNavigate("/CurrentOrder")}
            >
              Current Order
            </button>
            <button
              className={location.pathname === "/PlaceOrder" ? "active" : ""}
              onClick={() => handleNavigate("/PlaceOrder")}
            >
              Place Order
            </button>
            <button
              className={location.pathname === "/ViewCart" ? "active" : ""}
              onClick={() => handleNavigate("/ViewCart")}
            >
              View Cart
            </button>
            <button
              className={location.pathname === "/CustomerReview" ? "active" : ""}
              onClick={() => handleNavigate("/CustomerReview")}
            >
              Leave Review
            </button>
            <button
              className={location.pathname === "/CustomerViewMenu" ? "active" : ""}
              onClick={() => handleNavigate("/CustomerViewMenu")}
            >
              View Menu
            </button>
            <button
                className={
                    location.pathname === "/CustomerUpdateInfo" ? "active settings-button" : "settings-button"
                }
                onClick={() => handleNavigate("/CustomerUpdateInfo")}
                >
                <img src={settingImage} alt="Settings" />
            </button>
          </>
        )}
        {/* Add similar logic for other roles */}
        {/* Settings button */}
        <button
          className="settings-button"
          onClick={() => handleNavigate("/CustomerUpdateInfo")}
        >
          <img src={settingImage} alt="Settings" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
