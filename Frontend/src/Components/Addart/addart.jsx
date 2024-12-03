import React from 'react';
import './addart.css';

function Addart() {
  return (
    <div className="addart">
    <div className="auction-container">
      <h2>
        <span className="add-icon">+</span> ADD ART
      </h2>
      <hr />
      <form className="auction-form">
        <div className="form-row">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" placeholder="Enter product name" />
          </div>
          <div className="form-group image-upload">
            <label>Select Image</label>
            <input type="file" />
          </div>
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea placeholder="Enter description"></textarea>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input type="number" placeholder="Enter price" />
          </div>
          <div className="form-group">
            <label>Shipping Fee</label>
            <input type="number" placeholder="Enter shipping fee" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select>
              <option>Select type</option>
              <option value="oil painting">Oil Painting</option>
              <option value="watercolor painting">Watercolor Painting</option>
              <option value="acrylic paintig">Acrylic Painting</option>
            </select>
          </div>
          <div className="form-group">
            <label>Size</label>
            <select>
              <option>Select size</option>
              <option value="small">11" X 14"</option>
              <option value="medium">20" X 24"</option>
              <option value="large">30" X 40"</option>
            </select>
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select>
              <option>Select theme</option>
              <option value="nature">Nature</option>
             <option value="historical">Historical</option>
             <option value="modern">Modern</option>
            </select>
          </div>
        </div>
        <button type="submit" className="create-button">ADD</button>
      </form>
    </div>
    </div>
  );
}

export default Addart;
