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

  // Fetch data and check profile completion
  useEffect(() => {
    const fetchData = async () => {
      try {
          const artResponse = await fetch("http://localhost:5000/api/art/all");
          const artData = await artResponse.json();
          setArtworks(artData);
  
          const token = localStorage.getItem("token");
          const favoriteResponse = await fetch("http://localhost:5000/api/favorite/all", {
              headers: { Authorization: `Bearer ${token}` },
          });
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
  const toggleLike = async (item) => {
    const token = localStorage.getItem("token"); // Retrieve token
    if (!token) {
        alert("You must be logged in to like an item.");
        return;
    }

    const isLiked = likedItems[item._id];
    const url = isLiked 
        ? `http://localhost:5000/api/favorite/remove/${item._id}`
        : "http://localhost:5000/api/favorite/add";

    const method = isLiked ? "DELETE" : "POST";
    const body = isLiked 
        ? null 
        : JSON.stringify({
              productId: item._id,
              productName: item.productName,
              imageUrl: item.imageUrl,
              theme: item.theme,
              price: item.price,
          });

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include token
            },
            body,
        });

        if (!response.ok) {
            throw new Error("Failed to update favorite");
        }

        const updatedLikedItems = {
            ...likedItems,
            [item._id]: !isLiked,
        };

        setLikedItems(updatedLikedItems);
        localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
        console.log(isLiked ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
        console.error("Error updating favorite:", error);
    }
};

  // Handle card click (check profile completion before navigation)
  const handleCardClick = (item) => {
    if (!isProfileComplete) {
      alert("Please complete your profile to proceed.");
      navigate("/Edit Profile");
    } else {
      navigate("/buycard", { state: item });
    }
  };

  // Filter and sort items based on selected criteria
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
          <option value="8' X 10'">8' X 10'</option>
          <option value="9' X 12'">9' X 12'</option>
          <option value="11' X 14'">11' X 14'</option>
          <option value="16' X 20'">16' X 20'</option>
          <option value="18' X 24'">18' X 24'</option>
          <option value="20' X 24'">20' X 24'</option>
          <option value="24' X 30'">24' X 30'</option>
          <option value="24' X 36'">24' X 36'</option>
          <option value="30' X 40'">30' X 40'</option>
          <option value="36' X 48'">36' X 48'</option>
        </select>
        <select
          className="dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="newest-first">Newest First</option>
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
                      e.stopPropagation(); // Prevent triggering parent click
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