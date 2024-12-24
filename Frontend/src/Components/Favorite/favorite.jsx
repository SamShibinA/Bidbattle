import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favorite.css";

const Favorite = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await fetch("http://localhost:5000/api/favorite/all", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        const data = await response.json();
        setFavoriteItems(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleImageClick = (item) => {
    navigate("/buycard", { state: item });
  };

  return (
    <div className="favorite-container">
      <h2>
        <span className="favorite-icon">❤️</span> Favorite
      </h2>
      <div className="favorite-grid">
        {favoriteItems.length === 0 ? (
          <div>No favorite items found!</div>
        ) : (
          favoriteItems.map((item) => (
            <div key={item._id} className="favorite-item">
              <img
                src={`http://localhost:5000/${item.imageUrl}`}
                alt={item.productName}
                className="favorite-image"
                onClick={() => handleImageClick(item)}
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