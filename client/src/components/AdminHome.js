import React from "react";
import { Link } from "react-router-dom";
import "../styles/CourierHome.css";

const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link className="sub-button-Home" to="/admin/see-vendor-reviews">See Vendor Reviews</Link> <br /> 
        <Link className="sub-button-Home" to="/admin/see-vendor-requests">See Vendor Requests</Link> <br /> 
        <Link className="sub-button-Home" to="/admin/ban-vendors">Ban Vendors</Link><br /> 
        <Link className="sub-button-Home" to="/admin/see-courier-requests">See Courier Requests</Link>
      </nav>
    </div>
  );
};

export default AdminHomePage;
