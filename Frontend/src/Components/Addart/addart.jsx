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

    try {
      const response = await axios.post('http://localhost:5000/api/art/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
                <option value="small">11" X 14"</option>
                <option value="medium">20" X 24"</option>
                <option value="large">30" X 40"</option>
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
