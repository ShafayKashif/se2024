// Shehbaz
import '../../styles/vendorCss/vendorHome.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const VendorHome = () => {
  const navigate = useNavigate();
  //const navigate = useNavigate();
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

  const temp =() =>{
    console.log("HERE")
  }

  const updateStock = async (itemId, newStock) => {
    
    try {
      await axios.post('http://localhost:3001/updateStockVendor', { itemId, newStock });
      // Update local state with the new stock value
      
      const index = items.findIndex(item => item.itemId === itemId);
      temp()
      
      // If the item exists, update its stock
      if (index !== -1) {
        
        const updatedItems = [...items]; // Create a copy of the items array
        updatedItems[index].stock = newStock; // Update the stock of the item at the found index
        setItems(updatedItems); // Update the state with the modified items array
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };


  return (
    <div>
      <h1>Welcome,</h1>
      <div className="items-container">
        {items.map(item => (
          <div key={item.itemId} className="item-card">
            <h2>{item.itemName}</h2>
            <p>Category: {item.category}</p>
            <p>Stock: {item.stock}</p>
            <div>

            <button onClick={() => {
                updateStock(item.itemId, item.stock - 1);
                navigate("/VendorHome"); 
                
            }}>
            -
            </button>

            <button onClick={() => {
                updateStock(item.itemId, item.stock + 1);
                navigate("/VendorHome"); 
            }}>
            +
            </button>
            </div>
            <img src={item.image} alt={item.itemName} className="item-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorHome;