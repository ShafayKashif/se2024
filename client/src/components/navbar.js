// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./login_signup/AuthContext"; // Adjust the path as necessary

const Navbar = () => {
  const { authState } = useAuth(); // Directly use useAuth here
  const { role } = authState;

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-links">
        {role === "customer" && (
          <>
            <Link to="/CustomerHome">Homepage</Link>
            <Link to="/CurrentOrder">Current Order</Link>
            <Link to="/PlaceOrder">Place Order</Link>
            <Link to="/ViewCart">View Cart</Link>
            <Link to="/LeaveReview">Leave Review</Link>
          </>
        )}
        {role === "vendor" && (
          <>
            <Link to="/VendorHome">Homepage</Link>
            <Link to="/UpdateMenu">Update Menu</Link>
            <Link to="/ViewCurrentOrders">View Current Orders</Link>
            <Link to="/ViewReviews">View Reviews</Link>
          </>
        )}
        {role === "courier" && (
          <>
            <Link to="/CourierHome">Homepage</Link>
            <Link to="/ViewProgress">View My Progress</Link>
          </>
        )}
        <div className="navbar-settings">
          <Link to="/Settings">Settings</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
