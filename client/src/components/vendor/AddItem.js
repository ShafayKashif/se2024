//Shehbaz Ali
//ChatGPT was used for detecting errors
import React, { useState} from 'react'; // usestate to store the input values, learnt from: https://www.youtube.com/watch?v=5e9_hp0nh1Q
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import '../../styles/addItemCustom.css';


const AddItem = () => {
  const navigate = useNavigate();

  const vendorEmail = window.localStorage.getItem('email');



  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState(''); // State to store Cloudinary image link
  const [calories, setCalories] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  const handleAddItem = async (event) => {
    event.preventDefault();

    if (!itemName || !category || !stock || !price || !imageLink || !calories) {
      alert('Please fill in all fields');
      return; 
    }

    try {
      const formData = {
        itemName,
        category,
        stock,
        price,
        image: imageLink, // Cloudinary image link 
        vendorEmail,
        calories,
        type: 'add_item',
      };

      const response = await axios.post('http://localhost:3001/add_item', formData);

      if (response.status === 200) {
        console.log('Item added successfully!');
        alert('Item added successfully!');
        navigate(-1);//Once item is added, The user is sent one tab back
      }
    } catch (error) {
      console.error('Error adding item:', error.message);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleImageUpload = async (e) => {
    setLoading(true); // Set loading to true when image upload starts

    const selectedImage = e.target.files[0];

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'pv6cd033'); //cloudinary API https://youtu.be/yb3H3Zv1QMA?si=cERMBSP_TK5CEI6y

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dcswark7e/image/upload', formData);

      if (response.status === 200) {
        setImageLink(response.data.secure_url); // Set Cloudinary image link
      } else {
        throw new Error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when image upload completes
    }
  };
//The skeleton code from DB was expanded to include more fields and buttons
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
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div>
          <input
            className="item-inp"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {loading && <div className="loading-icon">Loading...</div>} {/* Render loading icon */}
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