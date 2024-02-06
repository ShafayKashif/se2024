import "../styles/CustomerReview.css";
import { useState } from "react";
import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

const CustomerReview = (props) => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
 


  const handleReview = async (event) => {
    event.preventDefault();

    if (!vendor || !rating || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/", {     
        vendor,
        rating,
        description,
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
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Description"
            value={description}
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
