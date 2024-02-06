import '../styles/CourierHome.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourierHome = () => {
  const navigate = useNavigate();

  const handleLeaveReview = (event) => {
    event.preventDefault(); // Prevent the form submission
    navigate('/SeeOrders');
  };

  return (
    <div>
      <h1>Hello, welcome to CampusCousine</h1>

      <form className="form" onSubmit={handleLeaveReview}>
        <div>
          <button className="sub-button-Home" type="submit">
            See available orders
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourierHome;
