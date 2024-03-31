import React from "react";
import { Link } from "react-router-dom";
import "../../styles/CourierHome.css";
import axios from 'axios'

const AdminHome = () => {

  let topTwoVendors
  const myFun = async () => {
    try{
      topTwoVendors = await axios.get("http://localhost:3001/getPopularVendorsInfo")
    } catch (err) {
      console.log("Error in admin")
    }
  }


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link className="sub-button-Home" to="/admin/see-vendor-reviews">
          See Vendor Ratings
        </Link>{" "}
        <br />
        <Link className="sub-button-Home" to="/admin/see-vendor-requests">
          View Join Requests
        </Link>{" "}
        <br />
        <Link className="sub-button-Home" to="/admin/ban-vendors">
          Ban User
        </Link>
        <br />
      </nav>
    </div>
  )
}

export default AdminHome
