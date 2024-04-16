import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/SeeVendorRequests.css';
import zIndex from "@mui/material/styles/zIndex";

const SeeVendorRequests = () => {
  const [vendorRequests, setVendorRequests] = useState([]);
  const [courierRequests, setCourierRequests] = useState([]);

  const seeRequests = async () => {
    try {
      const my_requests = await axios.get("http://localhost:3001/view-join-requests");
      console.log("Requests: ", my_requests)
      const allUsers = my_requests.data.allUsers;

      // Filter requests based on user type
      const vendorReqs = allUsers.filter(user => user.userType === 'vendor' || user.userType === 'studentVendor');
      const courierReqs = allUsers.filter(user => user.userType === 'courier');

      setVendorRequests(vendorReqs);
      setCourierRequests(courierReqs);
    } catch (err) {
      console.log("Error while querying for requests:", err);
    }
  };

  useEffect(() => {
    // Call seeRequests initially and then every 5 seconds
    seeRequests();

    const interval = setInterval(() => {
      seeRequests();
    }, 5000); // 5 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleDecision = async (userEmail, decision) => {
    try {
      // console.log("Email: ", userEmail)
      await axios.post("http://localhost:3001/application-decision", {
        userEmail,
        decision
      });
      // Remove the request from the UI
      setVendorRequests(prevRequests => prevRequests.filter(user => user.email !== userEmail));
      setCourierRequests(prevRequests => prevRequests.filter(user => user.email !== userEmail)); // Remove from courier requests if it exists
    } catch (err) {
      console.log("Error while sending application decision:", err);
    }
  };

  return (
    <div className='see-vendor-requests-container'>
      <div className="fixed-tint"></div>
  
      {/* Vendor Requests */}
      {vendorRequests.length > 0 && (
        <>
          <h2 className="popular-sellers-title">Vendor Requests</h2>
          {vendorRequests.map((vendor, index) => (
            <div className="vendor-card" key={index}>
              <h3>{vendor.name}</h3>
              <p>Price Range: {/* Add price range here */}</p>
              <p>Phone Number: {vendor.phone_Number}</p>
              {/* Render Approve and Decline buttons */}
              <button className="approve-button" onClick={() => handleDecision(vendor.email, "approve")}>Approve</button>
              <button className="decline-button" onClick={() => handleDecision(vendor.email, "decline")}>Decline</button>
            </div>
          ))}
        </>
      )}
  
      {/* Courier Requests */}
      {courierRequests.length > 0 && (
        <>
          <h2 className="popular-sellers-title">Courier Requests</h2>
          {courierRequests.map((courier, index) => (
            <div className="courier-card" key={index}>
              <h3>{courier.name}</h3>
              <p>Roll Number: {courier.roll_Number}</p>
              <p>Phone Number: {courier.phone_Number}</p>
              {/* Render Approve and Decline buttons */}
              <button className="approve-button" onClick={() => handleDecision(courier.email, "approve")}>Approve</button>
              <button className="decline-button" onClick={() => handleDecision(courier.email, "decline")}>Decline</button>
            </div>
          ))}
        </>
      )}
  
      {/* No Requests Message */}
      {((!vendorRequests && !courierRequests) || (vendorRequests.length === 0 && courierRequests.length === 0)) && (
        <h1 className="popular-sellers-title" style={{ transform: 'translate(500px, 0px)' }}>No current requests</h1>
      )}
    </div>
  );
  
};

export default SeeVendorRequests;