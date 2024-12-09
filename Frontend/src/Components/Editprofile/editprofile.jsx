import React, { useState } from 'react';
import axios from 'axios';
import './editprofile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';

function EditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({}); // To store validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const validateFields = () => {
    const newErrors = {};
    const { name, phone, city, state, pincode, country } = formData;

    if (!name) newErrors.name = 'Name is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!pincode) newErrors.pincode = 'Pincode is required';
    if (!country) newErrors.country = 'Country is required';

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      // Stop form submission if validation fails
      return;
    }

    const token = localStorage.getItem('token'); // JWT stored in localStorage

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (profilePicture) form.append('profilePicture', profilePicture);

    try {
      const response = await axios.put('http://localhost:5000/api/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Failed to update your profile');
    }
  };

  return (
    <div className="Editbox">
      <div className="edit-profile-container">
        <h2>
          <FontAwesomeIcon icon={faEdit} /> Edit Profile
        </h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <p className="error">{errors.pincode}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
          <div className="form-group file-upload-container">
            <label htmlFor="profilePicture">Upload Photo:</label>
            <div className="file-input-wrapper">
              <input type="file" id="profilePicture" name="profilePicture" onChange={handleFileChange} />
              <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            </div>
          </div>
          <button type="submit" className="save-button">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
