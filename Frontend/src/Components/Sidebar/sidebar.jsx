import React from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faShoppingCart, faGavel, faPlusCircle, faMinusCircle, faStar, faSignOutAlt, faHeart, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">

      <Link to="/Edit Profile"> 
          <div className="sidebar-option">
          <FontAwesomeIcon icon={faEdit} />
          <span>Edit Profile</span>
          </div>
        </Link>

      <Link to="/Create Auction">
          <div className="sidebar-option">
          <FontAwesomeIcon icon={faGavel} />
          <span>Create Auction</span>
          </div>
      </Link>
      <Link to="/Manage Order">
        <div className="sidebar-option">
          <FontAwesomeIcon icon={faUpload} />
          <span>Manage Order</span>
        </div>
      </Link>
      <Link to="/Add Art">
        <div className="sidebar-option">
        <FontAwesomeIcon icon={faPlusCircle} />
        <span>Add Art</span>
        </div>
      </Link>
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
      <div className="sidebar-option">
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default Sidebar;