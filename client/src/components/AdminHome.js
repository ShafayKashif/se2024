import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminHome.css";

const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin/see-vendor-reviews">See Vendor Reviews</Link>
        <Link to="/admin/see-vendor-requests">See Vendor Requests</Link>
        <Link to="/admin/ban-vendors">Ban Vendors</Link>
        <Link to="/admin/see-courier-requests">See Courier Requests</Link>
      </nav>
    </div>
  );
};

export default AdminHomePage;
