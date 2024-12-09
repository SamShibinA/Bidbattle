import React, { useState } from 'react';
import './createauction.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function CreateAuction() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    startingBid: '',
    shippingFee: '',
    startDateTime: '',
    endDateTime: '',
    type: '',
    size: '',
    theme: '',
  });

  const [image, setImage] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('description', formData.description);
    data.append('startingBid', formData.startingBid);
    data.append('shippingFee', formData.shippingFee);
    data.append('startDateTime', formData.startDateTime);
    data.append('endDateTime', formData.endDateTime);
    data.append('type', formData.type);
    data.append('size', formData.size);
    data.append('theme', formData.theme);
    if (image) {
      data.append('image', image); // Add image to FormData
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auction/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Auction created successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Failed to create auction');
      console.error(error);
    }
  };

  return (
    <div className="Createauction">
      <div className="auction-container">
        <h2>
          <FontAwesomeIcon icon={faGavel} />
          <span role="img" aria-label="auction-icon"></span> CREATE AUCTION
        </h2>
        <hr />
        <form className="auction-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name :</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Select Image:</label>
            <input
              type="file"
              className="image-upload"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group full-width">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Starting Bid:</label>
              <input
                type="number"
                name="startingBid"
                placeholder="50"
                value={formData.startingBid}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping Fee:</label>
              <input
                type="number"
                name="shippingFee"
                placeholder="50"
                value={formData.shippingFee}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Starting Date and Time:</label>
              <input
                type="datetime-local"
                name="startDateTime"
                value={formData.startDateTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Ending Date and Time:</label>
              <input
                type="datetime-local"
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="oil painting">Oil Painting</option>
                <option value="watercolor painting">Watercolor Painting</option>
                <option value="acrylic painting">Acrylic Painting</option>
              </select>
            </div>
            <div className="form-group">
              <label>Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                <option value="">Select Size</option>
                <option value="small">11" X 14"</option>
                <option value="medium">20" X 24"</option>
                <option value="large">30" X 40"</option>
              </select>
            </div>
            <div className="form-group">
              <label>Theme</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              >
                <option value="">Select Theme</option>
                <option value="nature">Nature</option>
                <option value="historical">Historical</option>
                <option value="modern">Modern</option>
              </select>
            </div>
          </div>
          <button type="submit" className="create-button">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAuction;
