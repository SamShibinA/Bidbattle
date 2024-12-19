import React, { useState } from 'react';
import './addart.css';
import axios from 'axios';

function Addart() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    shippingFee: '',
    type: '',
    size: '',
    theme: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('shippingFee', formData.shippingFee);
    data.append('type', formData.type);
    data.append('size', formData.size);
    data.append('theme', formData.theme);
    data.append('image', image);

    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post('http://localhost:5000/api/art/add', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Art added successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Failed to add art');
      console.error(error);
    }
  };

  return (
    <div className="addart">
      <div className="auction-container">
        <h2>
          <span className="add-icon">+</span> ADD ART
        </h2>
        <hr />
        <form className="auction-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group image-upload">
              <label>Select Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping Fee</label>
              <input
                type="number"
                name="shippingFee"
                placeholder="Enter shipping fee"
                value={formData.shippingFee}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option>Select type</option>
                <option value="oil painting">Oil Painting</option>
                <option value="watercolor painting">Watercolor Painting</option>
                <option value="acrylic painting">Acrylic Painting</option>
              </select>
            </div>
            <div className="form-group">
              <label>Size</label>
              <select name="size" value={formData.size} onChange={handleChange}>
                <option>Select size</option>
                <option value="8' X 10'">8' X 10'</option>
                <option value="9' X 12'">9' X 12'</option>
                <option value="11' X 14'">11' X 14'</option>
                <option value="16' X 20'">16' X 20'</option>
                <option value="18' X 24'">18' X 24'</option>
                <option value="20' X 24'">20' X 24'</option>
                <option value="24' X 30'">24' X 30'</option>
                <option value="24' X 36'">24' X 36'</option>
                <option value="30' X 40'">30' X 40'</option>
                <option value="36' X 48'">36' X 48'</option>
              </select>
            </div>
            <div className="form-group">
              <label>Theme</label>
              <select name="theme" value={formData.theme} onChange={handleChange}>
                <option>Select theme</option>
                <option value="nature">Nature</option>
                <option value="historical">Historical</option>
                <option value="modern">Modern</option>
              </select>
            </div>
          </div>
          <button type="submit" className="create-button">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addart;
