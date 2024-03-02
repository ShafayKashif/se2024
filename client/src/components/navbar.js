import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./login_signup/AuthContext";
import "../styles/Navbar.css";
import logoImage from "../styles/logo.png";
import settingImage from "../styles/settings.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { role } = authState;

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
            <button onClick={() => handleNavigate("/CustomerHome")}>
              Homepage
            </button>
            <button onClick={() => handleNavigate("/CurrentOrder")}>
              Current Order
            </button>
            <button onClick={() => handleNavigate("/PlaceOrder")}>
              Place Order
            </button>
            <button onClick={() => handleNavigate("/ViewCart")}>
              View Cart
            </button>
            <button onClick={() => handleNavigate("/CustomerReview")}>
              Leave Review
            </button>
          </>
        )}
        {role === "vendor" && (
          <>
            <button onClick={() => handleNavigate("/VendorHome")}>
              Homepage
            </button>
            <button onClick={() => handleNavigate("/UpdateMenu")}>
              Update Menu
            </button>
            <button onClick={() => handleNavigate("/ViewCurrentOrders")}>
              View Current Orders
            </button>
            <button onClick={() => handleNavigate("/ViewCustomerReviews")}>
              View Customer Reviews
            </button>
          </>
        )}
        {/* You can include navigation for other roles here */}
      </div>
      <button className="settings-button">
        <img src={settingImage} alt="Settings" />
      </button>
    </nav>
  );
};

export default Navbar;
