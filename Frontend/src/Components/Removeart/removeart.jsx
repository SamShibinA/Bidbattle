import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';
import './removeart.css';

const RemoveArt = () => {
  const [artItems, setArtItems] = useState([]);

  useEffect(() => {
    const fetchUserArtItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/art/user-art", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
          },
        });
        const data = await response.json();
        setArtItems(data);
      } catch (error) {
        console.error("Error fetching user art items:", error);
      }
    };

    fetchUserArtItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/art/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
        },
      });

      if (response.ok) {
        const updatedItems = artItems.filter((item) => item._id !== id);
        setArtItems(updatedItems);
      } else {
        const error = await response.json();
        console.error('Failed to remove art:', error.message);
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
          </span>{' '}
          Remove Art
        </h4>
        <hr />
        <div className="art-grid">
          {artItems.length > 0 ? (
            artItems.map((item) => (
              <div key={item._id} className="art-item">
                <img
                  src={`http://localhost:5000/${item.imageUrl}`}
                  alt={`Art ${item._id}`}
                  className="art-image"
                />
                <button
                  className="remove-button"
                  onClick={() => handleRemove(item._id)}
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
