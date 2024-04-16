import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/vendorCss/vendorUpdate.css";

const VendorUpdate = () => {
  const navigate = useNavigate();
  const vendorEmail = window.sessionStorage.getItem("email");
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    const checkBannedStatus = async () => {
      try {
        const response = await axios.post(
          "https://se2024-ghn9.onrender.com/is-vendor-banned",
          { email: vendorEmail }
        );
        setIsBanned(response.data.isBanned);
        if (response.data.isBanned) {
          alert("You have been banned: " + response.data.banDescription);
        }
      } catch (error) {
        console.error("Error checking banned status:", error);
      }
    };

    // Check banned status on component mount
    checkBannedStatus();

    // Set interval to check banned status every 10 seconds
    const interval = setInterval(() => {
      checkBannedStatus();
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [vendorEmail]);

  //const [itemName, setItemName] = useState('');
  //const [category, setCategory] = useState('');
  //const [stock, setStock] = useState('');
  //const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState("");
  //const [calories, setCalories] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddItem = async (event) => {
    event.preventDefault();

    if (!imageLink) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://se2024-ghn9.onrender.com/updateVendorImage",
        { email: vendorEmail, imageLink }
      );

      if (response.status === 200) {
        console.log("Item added successfully!");
        alert("picture added successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error adding item:", error.message);
      alert("Failed to add picture. Please try again.");
    }
  };

  const handleImageUpload = async (e) => {
    setLoading(true);

    const selectedImage = e.target.files[0];

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "pv6cd033");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcswark7e/image/upload",
        formData
      );

      if (response.status === 200) {
        setImageLink(response.data.secure_url);
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-page">
      <h1 className="add-item-header">Update Image</h1>
      <div className="partition"></div>
      <form className="form" onSubmit={handleAddItem}>
        {/* Input fields */}
        {/* Other input fields */}
        <div></div>
        {/* Image upload field */}
        <div>
          <input
            className="item-inp"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {loading && <div className="loading-icon">Loading...</div>}
        </div>
        <div>
          <button className="sub-button" type="submit" disabled={isBanned}>
            {isBanned ? "Banned: Cannot update Image" : "Update Image"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorUpdate;