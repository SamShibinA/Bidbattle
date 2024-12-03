import React from 'react';
import './favorite.css';
import p1 from '../Assests/Pic1.webp'
import p2 from '../Assests/Pic3.webp'
import p3 from '../Assests/Pic2.webp'

const Favorite = () => {
  const favoriteItems = [
    { id: 1, image: p1 },
    { id: 2, image: p2 },
    { id: 3, image: p3 },
    // Add more items as needed
  ];

  return (
    <div className="favorite-container">
      <h2>
        <span className="favorite-icon">❤️</span> Favourite
      </h2>
      <div className="favorite-grid">
        {favoriteItems.map((item) => (
          <div key={item.id} className="favorite-item">
            <img src={item.image} alt={`Favorite ${item.id}`} className="favorite-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
