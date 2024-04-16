import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/vendorCss/vendorUpdate.css';

const VendorUpdate = () => {
  const navigate = useNavigate();
  const vendorEmail = window.sessionStorage.getItem('email');
  const [isBanned, setIsBanned] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('');
  const [banDescription, setBanDescription] = useState('');

  useEffect(() => {
    const checkBannedStatus = async () => {
      try {
        const response = await axios.post('http://localhost:3001/is-vendor-banned', { email: vendorEmail });
        setIsBanned(response.data.isBanned);
        if (response.data.isBanned) {
          alert('You have been banned: ' + response.data.banDescription);
          setBanDescription(response.data.banDescription)
        }
      } catch (error) {
        console.error('Error checking banned status:', error);
      }
    };

    const checkApplicationStatus = async () => {
      try {
        const response = await axios.post('http://localhost:3001/is-application-approved', { email: vendorEmail, user_role: 'vendor' });
        setApplicationStatus(response.data.decision);
        if (response.data.decision === 'decline') {
          alert('Your application has been declined.');
        }
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    // Set interval to check banned status and application status every 10 seconds
    const interval = setInterval(() => {
      checkBannedStatus();
      checkApplicationStatus();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [vendorEmail]);

  //const [itemName, setItemName] = useState('');
  //const [category, setCategory] = useState('');
  //const [stock, setStock] = useState('');
  //const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
  //const [calories, setCalories] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddItem = async (event) => {
    event.preventDefault();

    if (!imageLink) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/updateVendorImage', {email: vendorEmail ,imageLink});

      if (response.status === 200) {
        console.log('Item added successfully!');
        alert('picture added successfully!');
        navigate(-1);
      }
    } catch (error) {
      console.error('Error adding item:', error.message);
      alert('Failed to add picture. Please try again.');
    }
  };

  const handleImageUpload = async (e) => {
    setLoading(true);

    const selectedImage = e.target.files[0];

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'pv6cd033');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dcswark7e/image/upload', formData);

      if (response.status === 200) {
        setImageLink(response.data.secure_url);
      } else {
        throw new Error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="add-item-page">
      {isBanned ? (
        <div>
          <h1>You have been banned!</h1>
          <p>{banDescription}</p>
        </div>
      ) : applicationStatus === 'processing' ? (
        <div>
          <h1>Application Processing</h1>
          <p>Your application is currently being processed. Please wait for approval.</p>
        </div>
      ) : applicationStatus === 'decline' ? (
        <div>
          <h1>Application Decision</h1>
          <p>Your application has been denied. Better luck next time, champ!</p>
        </div>
      ) : ( <div>
      <h1 className="add-item-header">Update Image</h1>
      <div className="partition"></div>
      <form className="form" onSubmit={handleAddItem}>
        {/* Input fields */}
        {/* Other input fields */}
        <div>

        </div>
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
            {isBanned ? 'Banned: Cannot update Image' : 'Update Image'}
          </button>
        </div>
      </form>
      </div>)}
    </div>
  );
};

export default VendorUpdate;
