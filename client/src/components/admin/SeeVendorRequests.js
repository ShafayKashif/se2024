import React, { useState, useEffect } from "react";
import axios from 'axios';

const SeeVendorRequests = () => {
  const [vendorRequests, setVendorRequests] = useState([]);
  const [courierRequests, setCourierRequests] = useState([]);

  useEffect(() => {
    seeRequests(); // Fetch requests when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  const seeRequests = async () => {
    try {
      const my_requests = await axios.get("http://localhost:3001/view-join-requests");
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

  const handleDecision = async (vendorEmail, decision) => {
    try {
      await axios.post("http://localhost:3000/application-decision", {
        vendorEmail,
        decision
      });
      // Remove the request from the UI
      setVendorRequests(prevRequests => prevRequests.filter(vendor => vendor.email !== vendorEmail));
      setCourierRequests(prevRequests => prevRequests.filter(courier => courier.email !== vendorEmail)); // Remove from courier requests if it exists
    } catch (err) {
      console.log("Error while sending application decision:", err);
    }
  };

  return (
    <div>
      <h1>Vendor Requests</h1>
      <button onClick={seeRequests}>See Requests</button>

      {/* Vendor Requests */}
      <h2>Vendor Requests</h2>
      {vendorRequests.map((vendor, index) => (
        <div key={index}>
          <p>Vendor Email: {vendor.email}</p>
          <p>Vendor Name: {vendor.name}</p>
          {/* Render Approve and Decline buttons */}
          <button onClick={() => handleDecision(vendor.email, "approve")}>Approve</button>
          <button onClick={() => handleDecision(vendor.email, "decline")}>Decline</button>
        </div>
      ))}

      {/* Courier Requests */}
      <h2>Courier Requests</h2>
      {courierRequests.map((courier, index) => (
        <div key={index}>
          <p>Courier Email: {courier.email}</p>
          <p>Courier Name: {courier.name}</p>
          {/* Render Approve and Decline buttons */}
          <button onClick={() => handleDecision(courier.email, "approve")}>Approve</button>
          <button onClick={() => handleDecision(courier.email, "decline")}>Decline</button>
        </div>
      ))}
    </div>
  );
};

export default SeeVendorRequests;
