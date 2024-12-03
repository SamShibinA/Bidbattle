import React from 'react';
import './editprofile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faShoppingCart, faGavel, faPlusCircle, faMinusCircle, faStar, faSignOutAlt, faHeart, faUpload } from '@fortawesome/free-solid-svg-icons';
function EditProfile() {
  return (
    <div className='Editbox'>
    <div className="edit-profile-container">
    <h2> <FontAwesomeIcon icon={faEdit} />   Edit Profile</h2>
    <hr />
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" />
      </div>
      <div className="form-group">
        <label htmlFor="phone-number">Phone Number:</label>
        <input type="tel" id="phone-number" name="phone-number" placeholder="Enter your phone number" />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" placeholder="Enter your city" />
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" placeholder="Enter your state" />
        <label htmlFor="pincode">Pincode:</label>
        <input type="text" id="pincode" name="pincode" placeholder="Enter your pincode" />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" placeholder="Enter your country" />
      </div>
      <div className="form-group">
        <label htmlFor="upload-photo">Upload Photo:</label>
        <input type="file" id="upload-photo" name="upload-photo" />
        <i className="fa fa-camera"></i>
      </div>
      <button type="submit" className="save-button">SAVE</button>
    </div>
    </div>
  );
}

export default EditProfile;