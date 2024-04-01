// CustomerCurrentOrder.js
//page author: Hassan Ali
import '../../styles/CustomerHome.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const CustomerCurrentOrder = () => {
  // State for storing orders and item information
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);




  // useEffect to fetch orders and item information on component mount
  useEffect(() => {
    const fetchItems = async () => {
        try {
            let customerEmail = localStorage.getItem('CustomerEmail');
            const response = await axios.post('http://localhost:3001/CustomerCurrentOrder', { customerEmail });
            setItems(response.data);//Server returns items being sold by he vendor
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    fetchItems();
  }, []);

  // JSX to render the component
  //styling help from youtube and syntaxtical from gpt
  return (

    <div className="maindiv">
        <div className="items-container1">
                {items.map(item => (
                    <div key={item.item_id} className="item-card1">
                        <h6>{item.item_id}</h6>
                        <p>Vendor: {item.vendorEmail}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                        <p>Total: {item.total}</p>
                        <p>Status: {item.status}</p>
                    </div>
                ))}
            </div>
        </div>

   
  );
};

export default CustomerCurrentOrder;