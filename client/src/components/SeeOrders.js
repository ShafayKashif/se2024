// SeeOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeeOrders = () => {
  // State for storing orders and item information
  const [orders, setOrders] = useState([]);
  const [itemInfo, setItemInfo] = useState({});

  // Function to handle the status change of an order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3001/order/update`, {
        orderId,
        newStatus
      });

      if (response.status === 200) {
        console.log('Order status updated successfully:', response.data.updatedOrder);
      } else {
        console.error('Failed to update order status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  // Function to get the next status based on the current status
  const getNextStatus = (currentStatus) => {
    return currentStatus === 'New' ? 'InProgress' : currentStatus === 'InProgress' ? 'Completed' : 'New';
  };

  // Function to fetch item information for a given item ID
  const fetchItemInfo = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:3001/item/${itemId}`);

      if (response.status === 200) {
        // Update itemInfo state with the fetched item information
        setItemInfo((prevItemInfo) => ({
          ...prevItemInfo,
          [itemId]: response.data
        }));
      } else {
        console.error('Failed to fetch item information:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching item information:', error.message);
    }
  };

  // useEffect to fetch orders and item information on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/order');
        if (response.status === 200) {
          // Update orders state with fetched orders
          setOrders(response.data);
          // Fetch item information for each order
          response.data.forEach((orderItem) => {
            fetchItemInfo(orderItem.item_id);
          });
        } else {
          console.error('Failed to fetch orders:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    // Call fetchOrders function on component mount
    fetchOrders();
  }, []);

  // JSX to render the component
  return (
    <div className="form-container">
      <h2>Customer orders</h2>
      <form>
        <table className="table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center', padding: '15px' }}>Item</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Pickup Address</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Customer</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Delivery Address</th>
              <th style={{ textAlign: 'center', padding: '15px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center', padding: '15px' }}>
                  {/* Display item name or 'Loading...' if not fetched */}
                  {itemInfo[orderItem.item_id] ? itemInfo[orderItem.item_id].itemName : 'Loading...'}
                </td>
                <td style={{ textAlign: 'center', padding: '15px' }}>{orderItem.client_addr}</td>
                <td style={{ textAlign: 'center', padding: '15px' }}>{orderItem.client}</td>
                <td style={{ textAlign: 'center', padding: '15px' }}>{orderItem.vendor_addr}</td>
                <td style={{ textAlign: 'center', padding: '15px' }}>
                  {/* Button to change order status */}
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
                    onClick={() => handleStatusChange(orderItem.id, getNextStatus(orderItem.status))}
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