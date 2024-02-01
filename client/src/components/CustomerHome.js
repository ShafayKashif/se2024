import '../styles/CustomerHome.css'
import { useState } from "react";
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerHome = (prop)=>{
    const navigate = useNavigate();

    const handlePlaceOrder = async (event) => {
      
        
    };

    const handleLeaveReview = async (event) => {
      navigate('/CustomerReview');  
    };

    return (        
        <div>
        <h1 >
          Hello, welcome to CampusCousine
        </h1>
        <div></div>
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
    )

}

export default CustomerHome

