import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./login_signup/AuthContext";
import "../styles/Navbar.css";
import logoImage from "../styles/logo.png";
import settingImage from "../styles/settings.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { role } = authState;

  // Effectively log the role changes - This can be expanded to handle role-specific logic
  useEffect(() => {
    console.log("Role has changed to: ", role);
  }, [role]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (!role) return null; // Optionally render nothing or a minimal navbar if no role is set

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
            <button onClick={() => handleNavigate("/CustomerViewMenu")}>
              View menu
            </button>
            <button
              onClick={() => handleNavigate("/CustomerUpdateInfo")}
              className="settings-button"
            >
              <img src={settingImage} alt="Settings" />
            </button>
          </>
        )}
        {role === "vendor" && (
          <>
            <button onClick={() => handleNavigate("/VendorHome")}>
              Homepage
            </button>
            <button onClick={() => handleNavigate("/AddItem")}>Add Item</button>
            <button onClick={() => handleNavigate("/VendorOrders")}>
              View Current Orders
            </button>
            <button onClick={() => handleNavigate("/ViewCustomersReviews")}>
              View Customer Reviews
            </button>
            <button onClick={() => handleNavigate("/VendorProfile")}>
              Profile & Analytics
            </button>
          </>
        )}
        {role === "courier" && (
          <>
            <button onClick={() => handleNavigate("/SeeOrders")}>
              See All Orders
            </button>
            <button onClick={() => handleNavigate("/courierAnalytics")}>
              View Analytics
            </button>
          </>
        )}
        {role === "admin" && (
          <>
            <button onClick={() => handleNavigate("/AdminHome")}>Home</button>
            <button onClick={() => handleNavigate("/seeVendorRatings")}>
              See All Orders
            </button>
            <button onClick={() => handleNavigate("/joinRequests")}>
              View Join Requests
            </button>
            <button onClick={() => handleNavigate("/banUser")}>Ban User</button>
          </>
        )}
      </div>
      <button className="settings-button">
        <img src={settingImage} alt="Settings" />
      </button>
    </nav>
  );
};

export default Navbar;
