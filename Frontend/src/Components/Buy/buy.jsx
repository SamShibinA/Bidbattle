import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./buy.css";

function Buy() {
  const navigate = useNavigate();

  // State to hold fetched data
  const [artworks, setArtworks] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [sizeFilter, setSizeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/art/all"); // API endpoint
        const data = await response.json();
        setArtworks(data); // Save fetched data to state
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchData();
  }, []);

  const toggleLike = (itemId) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemId]: !prevLikedItems[itemId],
    }));
  };

  const handleCardClick = (item) => {
    navigate("/buycard", { state: item });
  };

  // Filter and sort artworks
  const filteredAndSortedItems = artworks
    .filter((item) => (sizeFilter ? item.size.includes(sizeFilter) : true))
    .filter(
      (item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        <select className="dropdown" value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
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
        <select className="dropdown" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Filter</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
          <option value="newest-first">Newest First</option>
        </select>
      </div>

      <div className="card-container">
        {filteredAndSortedItems.length === 0 ? (
          <div className="no-result">No Result</div>
        ) : (
          filteredAndSortedItems.map((item) => (
            <div key={item._id} className="card" onClick={() => handleCardClick(item)}>
              <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.productName} />
              <div
                className="heart-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item._id);
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
