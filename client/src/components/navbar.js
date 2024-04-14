import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "./login_signup/AuthContext";
import "../styles/Navbar.css";
import logoImage from "../styles/campusCuisineSmall.png";
import settingImage from "../styles/gear.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { authState } = useAuth();
  // const { role } = authState;
  const role = window.sessionStorage.getItem('role')
  // console.log("Role: ", role)

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
        {/* TO DO ADD NAVIGATION FOR OTHER ACTORS AS WE RECEACH THERI USECSES */}
        {role === "courier" && (
          <>
            <button onClick={() => handleNavigate("/SeeOrders")}>
              See All Orders
            </button>
            <button onClick={() => handleNavigate("/courierAnalytics")}>
              view analytics
            </button>
          </>
        )}
        {role === "admin" && (
          <>
          <button onClick={() => handleNavigate("/AdminHome")}>
              Home
            </button>
            <button onClick={() => handleNavigate("/seeVendorRatings")}>
              View Vendor Reviews
            </button>
            <button onClick={() => handleNavigate("/joinRequests")}>
            View Join Requests
            </button>
            <button onClick={() => handleNavigate("/banUser")}>
            Ban User
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
