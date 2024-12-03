import React from 'react';
import './createauction.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faShoppingCart, faGavel, faPlusCircle, faMinusCircle, faStar, faSignOutAlt, faHeart, faUpload } from '@fortawesome/free-solid-svg-icons';

function CreateAuction() {
  return (
    <div className="Createauction">
    <div className="auction-container">
      <h2>
      <FontAwesomeIcon icon={faGavel} />
        <span role="img" aria-label="auction-icon"></span> CREATE AUCTION
      </h2>
      <hr />
      <form className="auction-form">
        <div className="form-group">
          <label>Product Name :</label>
          <input type="text" placeholder="Enter product name" />
        </div>
        <div className="form-group">
          <label>Select Image:</label>
          <input type="file" className="image-upload" />
        </div>
        <div className="form-group full-width">
          <label>Description:</label>
          <textarea placeholder="Enter product description"></textarea>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Starting Bid:</label>
            <input type="number" placeholder="50" />
          </div>
          <div className="form-group">
            <label>Shipping Fee:</label>
            <input type="number" placeholder="50" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Starting Date and Time:</label>
            <input type="datetime-local" />
          </div>
          <div className="form-group">
            <label>Ending Date and Time:</label>
            <input type="datetime-local" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select>
              <option value="">Select Type</option>
              <option value="oil painting">Oil Painting</option>
              <option value="watercolor painting">Watercolor Painting</option>
              <option value="acrylic paintig">Acrylic Painting</option>
            </select>
          </div>
          <div className="form-group">
            <label>Size</label>
            <select>
              <option value="">Select Size</option>
              <option value="small">11" X 14"</option>
              <option value="medium">20" X 24"</option>
              <option value="large">30" X 40"</option>
            </select>
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select>
              <option value="">Select Theme</option>
             <option value="nature">Nature</option>
             <option value="historical">Historical</option>
             <option value="modern">Modern</option>
            </select>
          </div>
        </div>
        <button type="submit" className="create-button">CREATE</button>
      </form>
    </div>
    </div>
  );
}

export default CreateAuction;
