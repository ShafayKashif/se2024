import "../../styles/CustomerHome.css";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [lastOrder, setLastOrder] = useState([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [amountSpent, setAmountSpent] = useState(0);

  const handlePlaceRecentOrder = async (event) => {
    const response = await axios.post(
      "https://se2024-ghn9.onrender.com/CustomerReOrder",
      { clientEmail: sessionStorage.getItem("email") }
    );
    if (response.status === 200) {
      alert("Order placed successfully!");
    } else {
      alert("Order failed!");
    }
  };

  const handleLeaveReview = async (event) => {
    navigate("/CustomerReview");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setSearchQuery();
    try {
      const response = await axios.post(
        "https://se2024-ghn9.onrender.com/query",
        {
          type: "food-search",
          query: searchQuery,
        }
      );

      navigate(`/search`, { state: { searchResults: response.data } });
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          "https://se2024-ghn9.onrender.com/CustomerTopVendors"
        );
        setItems(response.data); //Server returns items being sold by he vendor
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    const fetchLastOrder = async () => {
      try {
        const response = await axios.post(
          "https://se2024-ghn9.onrender.com/CustomerLastOrder",
          { clientEmail: sessionStorage.getItem("email") }
        );
        if (response.data.msg && response.data.msg === "No last order") {
          setLastOrder([]);
        } else {
          setLastOrder(response.data); //Server returns items being sold by he vendor
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    const fetchCalAndAmount = async () => {
      try {
        const response = await axios.post(
          "https://se2024-ghn9.onrender.com/CustomerCalAndAmount",
          { clientEmail: sessionStorage.getItem("email") }
        );
        console.log("response for cal and amount: ", response);
        setCaloriesConsumed(response.data.totalCalories);
        setAmountSpent(response.data.totalAmount);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
    fetchLastOrder();
    fetchCalAndAmount();
  }, []);

  return (
    <div className="maindiv">
      <h1></h1>
      <form onSubmit={handleSearchSubmit}>
        <input onChange={handleSearchInputChange} type="text" />
        <button
          type="submit"
          className="SearchButton"
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </form>
      <h3 className="title1">People's pick of the day:</h3>
      <div className="items-container1">
        {items.map((item) => (
          <div key={item.itemId} className="item-card1">
            <img src={item.image} alt={item.itemName} className="item-image1" />
            <h6>{item.itemName}</h6>
            <p>Category: {item.category}</p>
            <p>Vendor: {item.vendorEmail}</p>
            <p>Price: {item.price}</p>
            <p>calories: {item.calories}</p>
          </div>
        ))}
      </div>
      <div className="BottomCH">
        <h4 className="title1">Order again:</h4>
        <div className="items-container1">
          {lastOrder.map((item) => (
            <div key={item.itemId} className="item-card1">
              <img
                src={item.image}
                alt={item.itemName}
                className="item-image1"
              />
              <h6>{item.itemName}</h6>
              <p>Category: {item.category}</p>
              <p>Vendor: {item.vendorEmail}</p>
              <p>Price: {item.price}</p>
              <p>calories: {item.calories}</p>
              <button onClick={handlePlaceRecentOrder}>Re-Order</button>
            </div>
          ))}
        </div>
        <div className="BottomerCH">
          <h4>Calories Consumed with us: {caloriesConsumed}</h4>
          <h4>Amount spent with us: {amountSpent}</h4>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
