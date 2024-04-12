import React, { useEffect, useState } from "react";
import "../../styles/AdminHome.css";
import axios from 'axios';
import { Chart } from "react-google-charts";

const AdminHome = () => {
  const [topVendors, setTopVendors] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [myCustomerReviews, setMyCustomerReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getInfoForAdminHomePage");
        const { vendorsInfo, myCustomerReviews } = response.data;

        let temp = vendorsInfo;
        // Sort the vendorsInfo array based on totalPriceOfItemsSold in descending order
        temp.sort((a, b) => b.totalPriceOfItemsSold - a.totalPriceOfItemsSold).slice(0,2);

        // Set vendors state
        setTopVendors(temp);
        setAllVendors(vendorsInfo);
        setMyCustomerReviews(myCustomerReviews.reverse());
      } catch (err) {
        console.log("Error fetching admin home page info:", err);
      }
    };

    fetchData();
  }, []);

  // Transform topVendors data into the format expected by Chart component
  const chartData = allVendors.map(vendor => [vendor.name, vendor.orderCount]);

  const options = {
    title: "Vendors Order Count",
  };

  return (
    // <div className="container">
    <div>
      {/* Display top vendors */}
      <div className="most-popular-sellers">
        <h1 className="title">Most Popular Sellers:</h1>
        {topVendors.map((vendor, index) => (
          <div className="vendor-card" key={index}>
            <p className="vendor-name">{vendor.name}</p>
            <p>Price Range: ${vendor.minPrice} - ${vendor.maxPrice}</p>
          </div>
        ))}
      </div>

      {/* Display pie chart */}
      <div className="pie-chart">
        <h2 className="title">Number of Orders at Each Restaurant:</h2>
        <Chart
          chartType="PieChart"
          data={[["Name", "Order Count"], ...chartData]} // Include header row
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>

      {/* Display reviews sidebar */}
      <div className='customer-reviews' style={{ overflowX: "auto", whiteSpace: "nowrap"}}>
        <h2 className="review-title">Most recent reviews:</h2>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {myCustomerReviews.map((review, index) => (
            <li key={index} style={{ display: "inline-block", margin: "0 10px" }}>
              <p>Customer Email: {review.customer_email}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
