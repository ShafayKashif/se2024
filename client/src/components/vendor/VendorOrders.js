// SeeOrders.js
//page author: Talha Tariq
import "../../styles/SeeOrders.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorOrders = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const vendorEmail = window.localStorage.getItem("vendorEmail");

  const [Clickable, setIsClickable] = useState(true);

  const isClickable = (value) => {
    if (value === "Yes") {
      return true;
    } else {
      return false;
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Display confirmation pop-up based on the newStatus
      if (newStatus === "InProgress") {
        updateOrderStatus(orderId, newStatus);
      } else {
        if (window.confirm("Order Completed?")) {
          // Fetch the order details
          const orderDetails = await axios.get(
            `https://se2024-ghn9.onrender.com/order/${orderId}`
          );

          // Extract the email stored in the delivered_by attribute of the order
          const orderCourierEmail = orderDetails.data.delivered_by;

          // Verify if the courier's email matches the email stored in the delivered_by attribute
          updateOrderStatus(orderId, newStatus);
        }
      }
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };
  const getNextStatus = (currentStatus) => {
    return currentStatus === "New"
      ? "InProgress"
      : currentStatus === "InProgress"
      ? "Completed"
      : "Completed";
  };
  const getCourierEmail = () => {
    // Retrieve the courier's email from local storage
    const email = window.sessionStorage.getItem("email");
    // Return the courier's email
    return email;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Retrieve the courier's email from the authentication token or session

      const response = await axios.put(
        `https://se2024-ghn9.onrender.com/order/update`,
        {
          orderId: orderId,
          newStatus: newStatus,
          delivered_by: "", // Include the courier's email in the request
        }
      );

      if (response.status === 200) {
        // Update the local state with modified order data
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrders(updatedOrders);

        console.log(
          "Order status updated successfully:",
          response.data.updatedOrder
        );
      } else {
        console.error("Failed to update order status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          "https://se2024-ghn9.onrender.com/getNewOrders",
          { vendorEmail }
        );
        if (response.status === 200) {
          // Filter orders to include only those with delivery attribute set to true
          response.data.forEach(function (item) {
            if (item.hasOwnProperty("delivery")) {
              item.delivery = item.delivery ? "Yes" : "No";
            }
          });
          const filteredOrders = response.data;

          setOrders(filteredOrders);
          console.log(orders);
        } else {
          console.error("Failed to fetch orders:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="form-container">
      <h2>Customer orders</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th style={{ textAlign: "center", padding: "15px" }}>
                Customer Name
              </th>
              <th style={{ textAlign: "center", padding: "15px" }}>Item</th>
              <th style={{ textAlign: "center", padding: "15px" }}>Quantity</th>
              <th style={{ textAlign: "center", padding: "15px" }}>Total</th>
              <th style={{ textAlign: "center", padding: "15px" }}>Delivery</th>
              <th style={{ textAlign: "center", padding: "15px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              (orderItem, index) =>
                // Render only if the order status is not "Completed"
                orderItem.status !== "Completed" && (
                  <tr key={index}>
                    <td style={{ textAlign: "center", padding: "15px" }}>
                      {orderItem.client}
                    </td>
                    <td style={{ textAlign: "center", padding: "15px" }}>
                      {orderItem.itemName}
                    </td>
                    <td style={{ textAlign: "center", padding: "15px" }}>
                      {orderItem.quantity}
                    </td>
                    <td style={{ textAlign: "center", padding: "15px" }}>
                      {orderItem.total}
                    </td>
                    <td style={{ textAlign: "center", padding: "15px" }}>
                      {orderItem.delivery}
                    </td>
                    <td style={{ textAlign: "center", padding: "15px" }}>
                      <button
                        style={{
                          backgroundColor:
                            orderItem.status === "New"
                              ? "red"
                              : orderItem.status === "InProgress"
                              ? "yellow"
                              : "green",
                          color: "Black",
                          border: "none",
                          borderRadius: "10px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleStatusChange(
                            orderItem._id,
                            getNextStatus(orderItem.status)
                          )
                        }
                        disabled={isClickable(orderItem.delivery)}
                      >
                        {orderItem.status}
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorOrders;
