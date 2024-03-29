// Shehbaz
import '../../styles/vendorHome.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const VendorHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const vendorEmail = window.localStorage.getItem('vendorEmail');
  console.log("customer_email", vendorEmail); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post('http://localhost:3001/showitems', { vendorEmail }); 
        setItems(response.data);//Server returns items being sold by he vendor
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
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
  );
};

export default VendorHome;