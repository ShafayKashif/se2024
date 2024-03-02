import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./login_signup/AuthContext";
import "../styles/Navbar.css";
// Import the logo image here. Adjust the path as necessary.
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
        {/* Use the imported logoImage variable as the src */}
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
        {/* Include navigation for other roles here */}
      </div>
      <button className="settings-button">
        {/* Assume settings-icon.png is also imported if needed */}
        <img src={settingImage} alt="Settings" />
      </button>
    </nav>
  );
};

export default Navbar;
