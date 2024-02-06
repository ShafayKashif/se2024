import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeeOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/order'); // Replace with your actual endpoint
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.error('Failed to fetch orders:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  return (
    <div className="form-container">
      <h2>Customer orders</h2>
      <form>
        <table className="table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Client</th>
              <th>Client Hostel</th>
              <th>Vendor Hostel</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem, index) => (
              <tr key={index}>
                <td>{orderItem.vendor}</td>
                <td>{orderItem.client}</td>
                <td>{orderItem.clientHostel}</td>
                <td>{orderItem.vendorHostel}</td>
                <td>
                  <input type="checkbox" id={`checkbox-${index}`} />
                  <label className="checkbox-label" htmlFor={`checkbox-${index}`}></label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};
export default SeeOrders;
