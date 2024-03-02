import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/ViewCustomerReviews.css';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const vendorEmail = window.localStorage.getItem('vendorEmail');
    const navigate = useNavigate();

    const getReviews = async () => {
        try {
            const response = await axios.post('http://localhost:3001/ViewCustomerReviews', { vendorEmail }); 
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('Request Error:', error.request);
            } else {
                console.error('Unexpected Error:', error.message);
            }
        }
    };

    return (
        <div>
            <h1>Customer Reviews</h1>
            <button onClick={getReviews}>Get Reviews</button>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <strong>Customer Email:</strong> {review.customer_email} - <strong>Rating:</strong> {review.rating} - <strong>Comment:</strong> {review.comment}
                    </li>
                ))}
                {reviews.length === 0 && <li>No reviews found for this vendor.</li>}
            </ul>
        </div>
    );
}

export default Reviews;
