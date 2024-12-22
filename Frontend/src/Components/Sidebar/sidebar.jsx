import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faPlusCircle,
  faGavel,
  faUpload,
  faMinusCircle,
  faHeart,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileCompletion = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profile = response.data;
        const isComplete =
          profile.name &&
          profile.phone &&
          profile.city &&
          profile.state &&
          profile.pincode &&
          profile.country;
        setIsProfileComplete(isComplete);
      } catch (error) {
        console.error('Error checking profile:', error);
        setIsProfileComplete(false);
      }
    };

    checkProfileCompletion();
  }, []);

  const handleNavigation = (path) => {
    if (!isProfileComplete) {
      alert('Please complete your profile to proceed.');
      navigate('/Edit Profile'); // Redirect to edit profile if incomplete
    } else {
      navigate(path); // Navigate to the intended page if complete
    }
  };

  return (
    <div className="sidebar">
      <Link to="/Edit Profile">
        <div className="sidebar-option">
          <FontAwesomeIcon icon={faEdit} />
          <span>Edit Profile</span>
        </div>
      </Link>

      <div
        className="sidebar-option"
        onClick={() => handleNavigation('/Create Auction')}
      >
        <FontAwesomeIcon icon={faGavel} />
        <span>Create Auction</span>
      </div>

      <Link to="/Manage Order">
        <div className="sidebar-option">
          <FontAwesomeIcon icon={faUpload} />
          <span>Manage Order</span>
        </div>
      </Link>

      <div
        className="sidebar-option"
        onClick={() => handleNavigation('/Add Art')}
      >
        <FontAwesomeIcon icon={faPlusCircle} />
        <span>Add Art</span>
      </div>

      <Link to="/Remove Art">
        <div className="sidebar-option">
          <FontAwesomeIcon icon={faMinusCircle} />
          <span>Remove Art</span>
        </div>
      </Link>

      <Link to="/Favourite">
        <div className="sidebar-option">
          <FontAwesomeIcon icon={faHeart} />
          <span>Favourite</span>
        </div>
      </Link>

      <Link to="/Log Out">
        <div className="sidebar-option">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log Out</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
