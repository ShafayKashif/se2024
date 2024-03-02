// Shehbaz
import '../../styles/itemsdisplay.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

console.log("POSTY")

const VendorHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const email = window.localStorage.getItem('email');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post('http://localhost:3001/items', { email }); 
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);
  const handleAddItem = () => {
    navigate('Additem'); 
  };

  return (
    <div>
      <h1>VendorHome</h1>
      <button onClick={handleAddItem} className="add-item-button">Add Item</button> {/* Button to navigate to Additem page */}
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