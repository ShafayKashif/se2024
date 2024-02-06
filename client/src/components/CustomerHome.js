import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handlePlaceOrder = async (event) => {
        // Placing an order
    };

    const handleLeaveReview = async (event) => {
        navigate('/CustomerReview');  
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        // Perform filtering or other operations based on the search query here
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?q=${searchQuery}`); // Navigate to the search route with the search query
    };

    return (        
        <div>
            <h1>
                Hello, welcome to CampusCousine
            </h1>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button type="submit">Search</button>
            </form>
            <form className="form" onSubmit={handlePlaceOrder}>
                <div>
                    <button className="sub-button-Home" type="submit">Place Order</button>
                </div>
            </form>

            <form className="form" onSubmit={handleLeaveReview}>
                <div>
                    <button className="sub-button-Home" type="submit">Leave a Review</button>
                </div>
            </form>
        </div>
    );
};

export default CustomerHome;
