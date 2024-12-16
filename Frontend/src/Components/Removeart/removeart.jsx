import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';
import './removeart.css';

const RemoveArt = () => {
  const [artItems, setArtItems] = useState([]);

  useEffect(() => {
    // Fetch the user's artwork from the backend
    const fetchArtItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/art/all"); // Get all art items from the server
        const data = await response.json();
        setArtItems(data); // Store them in the state
      } catch (error) {
        console.error("Error fetching art items:", error);
      }
    };

    fetchArtItems();
  }, []);

  // Function to handle removing an item by its ID
  const handleRemove = async (id) => {
    try {
      // Call the API to remove the art by its ID
      const response = await fetch(`http://localhost:5000/api/art/remove/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the delete request was successful, update the state to remove the item
        const updatedItems = artItems.filter(item => item._id !== id);
        setArtItems(updatedItems);
      } else {
        console.error('Failed to remove art');
      }
    } catch (error) {
      console.error('Error removing art:', error);
    }
  };

  return (
    <div className="remveart">
      <div className="gallery-container">
        <h4>
          <span className="remove-icon">
            <FontAwesomeIcon icon={faMinimize} />
          </span> Remove Art
        </h4>
        <hr />
        <div className="art-grid">
          {artItems.length > 0 ? (
            artItems.map((item) => (
              <div key={item._id} className="art-item">
                <img
                  src={`http://localhost:5000/${item.imageUrl}`} // Use the full image URL
                  alt={`Art ${item._id}`}
                  className="art-image"
                />
                <button
                  className="remove-button"
                  onClick={() => handleRemove(item._id)} // Call handleRemove with the artwork ID
                >
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

export default RemoveArt;
