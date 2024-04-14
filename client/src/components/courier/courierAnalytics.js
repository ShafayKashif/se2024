import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/courierAnalytics.css';

const CourierAnalytics = () => {
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [completedOrders, setCompletedOrders] = useState([]);
  const courierEmail = getCourierEmail();

  function getCourierEmail() {
    // Retrieve the courier's email from local storage
    return window.sessionStorage.getItem('email');
  }

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/completed/${courierEmail}`);
        if (response.status === 200) {
          setCompletedOrders(response.data.completedOrders);
          setCompletedOrdersCount(response.data.completedOrders.length);
        } else {
          console.error('Failed to fetch completed orders:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching completed orders:', error.message);
      }
    };

    fetchCompletedOrders();
  }, [courierEmail]);

  return (
    <div>
      <h1>Welcome {courierEmail}</h1>
      <div className="container">
        <div className="stats-container">
          <div className="stat-box">
            <h2>Number of Orders Completed</h2>
            <p className="stat-value">{completedOrdersCount}</p>
          </div>
          <div className="stat-box">
            <h2>Total Earnings</h2>
            <p className="stat-value">{completedOrdersCount * 50}</p>
          </div>
        </div>
      </div>
      <div className="form-container">
        <h2>Completed Orders</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Vendor Name</th>
                <th>Pickup Address</th>
                <th>Customer Name</th>
                <th>Delivery Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}> {/* Add inline styles */}
              {completedOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.vendor}</td>
                  <td>{order.vendor_addr}</td>
                  <td>{order.client}</td>
                  <td>{order.client_addr}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourierAnalytics;
