// SeeOrders.js
//page author: Talha Tariq
import '../../styles/SeeOrders.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeeOrders = () => {
  const [orders, setOrders] = useState([]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Display confirmation pop-up based on the newStatus
      if (newStatus === 'InProgress') {
        if (window.confirm('Have you picked up the order?')) {
          // If the user confirms, proceed with the status change
          updateOrderStatus(orderId, newStatus);
        }
      } else if (newStatus === 'Completed') {
        window.confirm('The order has been delivered')
        }
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3001/order/update`, {
        orderId: orderId,
        newStatus: newStatus
      });

      if (response.status === 200) {
        console.log('Order status updated successfully:', response.data.updatedOrder);
        // If you want to update the UI after status change, you can refetch orders here
        // Refetching orders can be done by calling fetchOrders()
      } else {
        console.error('Failed to update order status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  const getNextStatus = (currentStatus) => {
    return currentStatus === 'New' ? 'InProgress' : currentStatus === 'InProgress' ? 'Completed' : 'Completed';
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courierorder');
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
  }, []);

  return (
    <div className="form-container">
      <h2>Customer orders</h2>
      <form>
        <table className="table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center', padding: '15px' }}>Vendor Name</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Pickup Address</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Customer Name</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Delivery Address</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center', padding: '15px' }}>{orderItem.vendor}</td>
                <td style={{ textAlign: 'center', padding: '15px' }}>{orderItem.vendor_addr}</td>
                <td style={{ textAlign: 'center', padding: '15px' }}>{orderItem.client}</td>
                <td style={{ textAlign: 'center', padding: '15px' }}>{orderItem.client_addr}</td>
                <td style={{ textAlign: 'center', padding: '15px' }}>
                  <button
                    style={{
                      backgroundColor:
                        orderItem.status === 'New'
                          ? 'red'
                          : orderItem.status === 'InProgress'
                          ? 'yellow'
                          : 'green',
                      color: 'Black',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleStatusChange(orderItem._id, getNextStatus(orderItem.status))}
                  >
                    {orderItem.status}
                  </button>
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
