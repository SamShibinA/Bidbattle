import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favorite.css";

const Favorite = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching full product details from the server (e.g., product name, image, description, etc.)
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/favorite/all");
        const data = await response.json();
        setFavoriteItems(data); // Save the full list of favorites
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleImageClick = (item) => {
    // Navigate to BuyCard and send the full item data as state
    navigate("/buycard", { state: item });
  };

  return (
    <div className="favorite-container">
      <h2>
        <span className="favorite-icon">❤️</span> Favorite
      </h2>
      <div className="favorite-grid">
        {favoriteItems.length === 0 ? (
          <div>No favorite items found!</div> // Display when there are no favorite items
        ) : (
          favoriteItems.map((item) => (
            <div key={item._id} className="favorite-item">
              <img
                src={`http://localhost:5000/${item.imageUrl}`} // Use the full image URL from the backend
                alt={item.productName}
                className="favorite-image"
                onClick={() => handleImageClick(item)} // Send full item data on image click
                style={{ cursor: "pointer" }}
              />
              <div className="card-title">{item.productName}</div>
              <div className="card-price">${item.price}</div>
              <div className="card-theme">Theme: {item.theme}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorite;
