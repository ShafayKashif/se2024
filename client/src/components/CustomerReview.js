import "../styles/CustomerReview.css";
import { useState } from "react";
import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

const CustomerReview = (props) => {
  const navigate = useNavigate();
  const [vendor_email, setVendor] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setDescription] = useState("");

  const handleReview = async (event) => {
    event.preventDefault();
    if (!vendor_email || !rating || !comment) {
      alert("Please fill in all required fields.");
      return;
    }

    const customer_email = window.localStorage.getItem('email');
    console.log("customer_email", customer_email); 

    try {
      const response = await axios.get('http://localhost:3001/order'); 
      if (response.status === 200) {
        console.log("orders fetched!");
        const orders = response.data;
        console.log("orders", orders);
        const order = orders.find(order => order.vendorEmail === vendor_email && order.clientEmail === customer_email);
        console.log("order", order);
        if (!order) {
          alert("You have not ordered from this vendor.");
          return;
        }
      } else {
        console.error('Failed to fetch orders:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }

    try {
      const response = await axios.post("http://localhost:3001/", {     
        vendor_email,
        customer_email,
        rating,
        comment,
      type: "review",
      usertype: "customer",});

      if (response.status === 200) {
        console.log("review logged!");
        navigate('/CustomerHome');
      } else {
        console.error("review log failed:", await response.text());
      }
    } catch (error) {
      console.error("error logging review::", error.message);
    }



  };

  return (
    <div className="review">
      <h1 >
        Review your vendor
      </h1>
      <div className="partition"></div>
      <form className="form" onSubmit={handleReview}>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Vendor Name"
            value={vendor_email}
            onChange={(e) => setVendor(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Description"
            value={comment}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="number"
            placeholder="Rating /5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <button className="sub-button" type="submit">
            Submit Review
          </button>
        </div>
      </form>
      <div className="question">
        Go back to <a href="/CustomerHome">Home</a>
      </div>
    </div>
  );
};

export default CustomerReview;
