import '../../styles/CustomerHome.css'
import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerHome = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                let customerEmail = localStorage.getItem('CustomerEmail');
                const response = await axios.post('http://localhost:3001/CustomerViewCart',{ customerEmail});
                setItems(response.data);//Server returns items being sold by he vendor
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);


    return (
        <div className='maindiv'>
            <h3 className='title'>
                Your cart:
            </h3>
            <div className="items-container1">
                {items.map(item => (
                    <div key={item.itemId} className="item-card1">
                        <img src={item.image} alt={item.itemName} className="item-image1" />
                        <h6>{item.item_name}</h6>
                        <p>Vendor: {item.vendor}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                        <p>Total: {item.total}</p>
                    </div>
                ))}
            </div> 
        </div>
    );

}

export default CustomerHome;