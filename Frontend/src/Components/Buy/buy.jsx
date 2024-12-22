import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./buy.css";

function Buy() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [sizeFilter, setSizeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artResponse = await fetch("http://localhost:5000/api/art/all");
        const artData = await artResponse.json();
        setArtworks(artData);

        const favoriteResponse = await fetch("http://localhost:5000/api/favorite/all");
        const favoriteData = await favoriteResponse.json();

        const likedMap = {};
        favoriteData.forEach((fav) => {
          likedMap[fav.productId] = true;
        });

        const localLikedItems = JSON.parse(localStorage.getItem("likedItems")) || {};
        setLikedItems({ ...likedMap, ...localLikedItems });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const checkProfileCompletion = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
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
        console.error("Error checking profile:", error);
        setIsProfileComplete(false);
      }
    };

    fetchData();
    checkProfileCompletion();
  }, []);

  const handleCardClick = (item) => {
    if (!isProfileComplete) {
      alert("Please complete your profile to proceed.");
      navigate("/Edit Profile");
    } else {
      navigate("/buycard", { state: item });
    }
  };

  const filteredAndSortedItems = artworks
    .filter((item) => (sizeFilter ? item.size.includes(sizeFilter) : true))
    .filter(
      (item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === "low-to-high") {
        return a.price - b.price;
      } else if (sortOption === "high-to-low") {
        return b.price - a.price;
      } else if (sortOption === "newest-first") {
        return new Date(b._id).getTime() - new Date(a._id).getTime();
      }
      return 0;
    });

  return (
    <div className="app-container">
      <div className="search-filter-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for Arts and Theme"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="icon">🔍</div>
        </div>
        <select
          className="dropdown"
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
        >
          <option value="">Size</option>
          {/* Add size options */}
        </select>
        <select
          className="dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort</option>
          {/* Add sort options */}
        </select>
      </div>

      <div className="card-container">
        {filteredAndSortedItems.length === 0 ? (
          <div className="no-result">No Results Found</div>
        ) : (
          filteredAndSortedItems.map((item) => (
            <div
              key={item._id}
              className="card"
              onClick={() => handleCardClick(item)}
            >
              <img
                src={`http://localhost:5000/${item.imageUrl}`}
                alt={item.productName}
              />
              <div
                className="heart-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item);
                }}
                style={{
                  color: likedItems[item._id] ? "red" : "gray",
                  cursor: "pointer",
                  fontSize: "22px",
                  position: "absolute",
                  right: "10px",
                }}
              >
                {likedItems[item._id] ? "❤️" : "🤍"}
              </div>
              <div className="card-title">{item.productName}</div>
              <div className="card-price">${item.price}</div>
              <div className="card-theme">Theme: {item.theme}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Buy;
