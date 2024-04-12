import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AddItem.css';

const AddItem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [vendorEmail, setVendorEmail] = useState('');

  // Use useEffect to get the email from the previous page and set it in VendorEmail
  useEffect(() => {
    const emailFromPreviousPage = location.state && location.state.email;
    setVendorEmail(emailFromPreviousPage || 'default@email.com');
  }, [location.state]);

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleAddItem = async (event) => {
    event.preventDefault();

    if (!itemName || !category || !stock || !price || !imageFile) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('itemName', itemName);
      formData.append('category', category);
      formData.append('stock', stock);
      formData.append('price', price);
      formData.append('image', imageFile);
      formData.append('vendorEmail', vendorEmail);
      formData.append('type', "add_item");

      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Item added successfully!');
        alert('Item added successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding item:', error.message);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="add-item-page">
      <h1 className="add-item-header">ADD ITEM</h1>
      <div className="partition"></div>
      <form className="form" onSubmit={handleAddItem}>
        <div>
          <input
            className="item-inp"
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="item-inp"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <input
            className="item-inp"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <input
            className="item-inp"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            className="item-inp"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <button className="sub-button" type="submit">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;