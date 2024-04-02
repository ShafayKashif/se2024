import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isBanned, setIsBanned] = useState(false);
  const [banDescription, setBanDescription] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('');
  const email = window.sessionStorage.getItem('email');

  useEffect(() => {
    // Function to fetch items
    const fetchItems = async () => {
      try {
        const response = await axios.post('http://localhost:3001/items', { email });
        setItems(response.data); // Server returns items being sold by the vendor
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // Function to check if the vendor is banned
    const checkBannedStatus = async () => {
      try {
        const response = await axios.post('http://localhost:3001/is-vendor-banned', { email });
        if (response.data.isBanned) {
          setIsBanned(true);
          setBanDescription(response.data.banDescription);
        }
      } catch (error) {
        console.error('Error checking banned status:', error);
      }
    };

    // Function to check application status
    const checkApplicationStatus = async () => {
      try {
        const response = await axios.post('http://localhost:3001/is-application-approved', { email, user_role: 'vendor' });
        const status = response.data.decision;
        if (status === 'approved') {
          // Application approved, render functionality
          fetchItems();
        } else if (status === 'declined') {
          // Application declined, alert the user
          alert('Your application has been declined.');
        } else {
          // Application still processing, set status
          setApplicationStatus('processing');
        }
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    // Initial calls to fetch items, check banned status, and application status
    fetchItems();
    const interval = setInterval(() => {
      checkBannedStatus();
    }, 0) 
    
    checkApplicationStatus();

    // Set interval to check application status every 5 seconds
    const interval2 = setInterval(() => {
      checkApplicationStatus();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval2) && clearInterval(interval);
  }, [email]);

  return (
    <div>
      {isBanned ? (
        <div>
          <h1>You have been banned!</h1>
          <p>{banDescription}</p>
        </div>
      ) : applicationStatus === 'processing' ? (
        <div>
          <h1>Application Processing</h1>
          <p>Your application is currently being processed. Please wait for approval.</p>
        </div>
      ) : (
        <div>
          <h1>Welcome,</h1>
          <div className="items-container">
            {items.map(item => (
              <div key={item.itemId} className="item-card">
                <h2>{item.itemName}</h2>
                <p>Category: {item.category}</p>
                <img src={item.image} alt={item.itemName} className="item-image" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorHome;
