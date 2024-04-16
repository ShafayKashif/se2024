import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/vendorCss/ViewCustomerReviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isBanned, setIsBanned] = useState(false);
  const navigate = useNavigate();
  const vendorEmail = window.sessionStorage.getItem("email");

  useEffect(() => {
    const checkBannedStatus = async () => {
      try {
        const response = await axios.post(
          "https://se2024-ghn9.onrender.com/is-vendor-banned",
          { email: vendorEmail }
        );
        setIsBanned(response.data.isBanned);
        if (response.data.isBanned) {
          alert("You have been banned: " + response.data.banDescription);
        }
      } catch (error) {
        console.error("Error checking banned status:", error);
      }
    };

    // Check banned status on component mount
    checkBannedStatus();
  }, [vendorEmail]); // Add vendorEmail to the dependency array

  const getReviews = async () => {
    try {
      const response = await axios.post(
        "https://se2024-ghn9.onrender.com/ViewCustomerReviews",
        { vendorEmail }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Customer Reviews</h1>
      <button onClick={getReviews} disabled={isBanned}>
        Get Reviews
      </button>
      {isBanned && <p>You are banned. You cannot view reviews.</p>}
      <div className="review-container">
        <div className="review-grid">
          {reviews.slice(0, 4).map((review, index) => (
            <div className="review-box" key={index}>
              <div className="review-details">
                <strong>Customer Email:</strong> {review.customer_email} <br />
                <strong>Rating:</strong> {review.rating} <br />
                <strong>Comment:</strong> {review.comment} <br />
                <br /> {/* Adding a gap between reviews */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {reviews.length === 0 && (
        <p className="no-reviews">No reviews found for this vendor.</p>
      )}
    </div>
  );
}

export default Reviews;
