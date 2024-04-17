import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/SeeVendorRequests.css';

const SeeVendorRequests = () => {
  const [vendorRequests, setVendorRequests] = useState([]);
  const [courierRequests, setCourierRequests] = useState([]);

  const seeRequests = async () => {
    try {
      const my_requests = await axios.get("http://localhost:3001/view-join-requests");
      const allUsers = my_requests.data.allUsers;

      const vendorReqs = allUsers.filter(user => user.userType === 'vendor' || user.userType === 'studentVendor');
      const courierReqs = allUsers.filter(user => user.userType === 'courier');

      setVendorRequests(vendorReqs);
      setCourierRequests(courierReqs);
    } catch (err) {
      console.log("Error while querying for requests:", err);
    }
  };

  useEffect(() => {
    seeRequests();
    const interval = setInterval(() => {
      seeRequests();
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDecision = async (userEmail, decision) => {
    try {
      await axios.post("http://localhost:3001/application-decision", {
        userEmail,
        decision
      });
      setVendorRequests(prevRequests => prevRequests.filter(user => user.email !== userEmail));
      setCourierRequests(prevRequests => prevRequests.filter(user => user.email !== userEmail));
    } catch (err) {
      console.log("Error while sending application decision:", err);
    }
  };

  return (
    <div className='see-vendor-requests-container' style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)', position: 'relative' }}>
      {/* Vendor Requests Panel */}
      <div className="request-panel" style={{ flex: '1', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)', zIndex: '2' }}>
        <h2 className="request-title">Vendor Requests</h2>
        {vendorRequests.length > 0 ? (
          vendorRequests.map((vendor, index) => (
            <div className="request-card vendor-card" key={index} style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)' }}>
              <h3>{vendor.name}</h3>
              <p>Roll Number: {vendor.roll_Number}</p>
              <p>Phone Number: {vendor.phone_Number}</p>
              <div style={{ marginTop: '10px' }}>
                <button className="approve-button" onClick={() => handleDecision(vendor.email, "approve")} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Approve</button>
                <button className="decline-button" onClick={() => handleDecision(vendor.email, "decline")} style={{ padding: '10px 20px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="no-requests-message">No current vendor requests</h1>
        )}
      </div>
      
      {/* Courier Requests Panel */}
      <div className="request-panel" style={{ flex: '1', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)', zIndex: '1' }}>
        <h2 className="request-title">Courier Requests</h2>
        {courierRequests.length > 0 ? (
          courierRequests.map((courier, index) => (
            <div className="request-card courier-card" key={index} style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)' }}>
              <h3>{courier.name}</h3>
              <p>Roll Number: {courier.roll_Number}</p>
              <p>Phone Number: {courier.phone_Number}</p>
              <div style={{ marginTop: '10px' }}>
                <button className="approve-button" onClick={() => handleDecision(courier.email, "approve")} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Approve</button>
                <button className="decline-button" onClick={() => handleDecision(courier.email, "decline")} style={{ padding: '10px 20px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="no-requests-message">No current courier requests</h1>
        )}
      </div>
    </div>
  );
};

export default SeeVendorRequests;
