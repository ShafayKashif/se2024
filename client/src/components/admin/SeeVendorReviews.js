import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/AdminHome.css";

const SeeVendorReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews"); // Adjust
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div>
      <h1>Vendor Reviews</h1>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>
              <strong>Vendor:</strong> {review.vendor}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <strong>Description:</strong> {review.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeVendorReviews;
