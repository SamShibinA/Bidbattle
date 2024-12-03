import React, { useState } from 'react';

import './removeart.css';
import p1 from '../Assests/Pic1.webp';
import p2 from '../Assests/Pic2.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';

const Removeart = () => {
  const [artItems, setArtItems] = useState([
    { id: 1, image: p1 },
    { id: 2, image: p2 },
    // Add more items as needed
  ]);

  // Function to handle removing an item by its ID
  const handleRemove = (id) => {
    // Filter out the item with the matching ID
    const updatedItems = artItems.filter(item => item.id !== id);
    setArtItems(updatedItems); // Update the state with the new list
  };

  return (
    <div className="remveart">
    <div className="gallery-container">
      <h4>
        <span className="remove-icon"></span> Remove Art
      </h4>
      <hr />
      <div className="art-grid">
        {artItems.length > 0 ? (
          artItems.map((item) => (
            <div key={item.id} className="art-item">
              <img src={item.image} alt={`Art ${item.id}`} className="art-image" />
              <button className="remove-button" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="no-art-message">No Art To Remove</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Removeart;
