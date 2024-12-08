import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buy.css";
import p1 from "../Assests/Pic1.webp";
import p2 from "../Assests/Pic2.webp";
import p3 from "../Assests/Pic3.webp";
import p4 from "../Assests/Pic4.webp";
import p5 from "../Assests/Pic5.webp";
import p6 from "../Assests/Pic6.jpg";
import p7 from "../Assests/Pic7.jpeg";
import p8 from "../Assests/Pic8.jpeg";
import p9 from "../Assests/Pic9.jpg";

function Buy() {
  const navigate = useNavigate();
  const items = [
    { id: 1, imgSrc: p4, title: "The Fall in a Forest", price: "$175.00", theme: "Nature", size: "16 X 20", type: "Oil Painting", description: "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.", shippingprice: "$34" },
    { id: 2, imgSrc: p5, title: "Abstract Colors", price: "$200.00", theme: "Modern", size: "Small", description: "The Mona Lisa is a renowned portrait by Leonardo da Vinci, famous for its enigmatic smile and captivating realism.", shippingprice: "$14" },
    { id: 3, imgSrc: p2, title: "The Everest Along with Nature", price: "$150.00", theme: "Nature", size: "Medium", description: "The Mona Lisa is a renowned portrait by Leonardo da Vinci, famous for its enigmatic smile and captivating realism.", shippingprice: "$24" },
    { id: 4, imgSrc: p3, title: "Man inside a Painting", price: "$200.00", theme: "Modern", size: "Large", description: "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.", shippingprice: "$34" },
    { id: 5, imgSrc: p4, title: "The Fall in a Forest", price: "$175.00", theme: "Nature", size: "Medium", description: "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.", shippingprice: "$84" },
    { id: 6, imgSrc: p5, title: "Abstract Colors", price: "$200.00", theme: "Modern", size: "Small", description: "The Mona Lisa is a renowned portrait by Leonardo da Vinci, famous for its enigmatic smile and captivating realism.", shippingprice: "$24" },
    { id: 7, imgSrc: p6, title: "Desert Mirage", price: "$200.00", theme: "Modern", size: "Large", description: "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.", shippingprice: "$14" },
    { id: 8, imgSrc: p7, title: "Cityscape Twilight", price: "$200.00", theme: "Modern", size: "Medium", description: "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.", shippingprice: "$64" },
    { id: 9, imgSrc: p8, title: "Dreamy Landscape", price: "$200.00", theme: "Historical", size: "Small", description: "The Mona Lisa is a renowned portrait by Leonardo da Vinci, famous for its enigmatic smile and captivating realism.", shippingprice: "$44" },
    { id: 10, imgSrc: p9, title: "Lost in Thought", price: "$200.00", theme: "Classic", size: "Large", description: "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.", shippingprice: "$74" },
    { id: 11, imgSrc: p1, title: "The Fall in a Forest", price: "$175.00", theme: "Nature", size: "Large", description: "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.", shippingprice: "$44" },
    { id: 12, imgSrc: p3, title: "Abstract Colors", price: "$200.00", theme: "Modern", size: "Small", description: "The Mona Lisa is a renowned portrait by Leonardo da Vinci, famous for its enigmatic smile and captivating realism.", shippingprice: "$54" },
  ];

  const [likedItems, setLikedItems] = useState({});
  const [sizeFilter, setSizeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleLike = (itemId) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemId]: !prevLikedItems[itemId],
    }));
  };

  const handleCardClick = (item) => {
    navigate("/buycard", { state: item });
  };

  const filteredAndSortedItems = items
    .filter((item) => (sizeFilter ? item.size.includes(sizeFilter) : true))
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "low-to-high") {
        return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
      } else if (sortOption === "high-to-low") {
        return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
      } else if (sortOption === "newest-first") {
        return b.id - a.id;
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
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
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
            <div key={item.id} className="card" onClick={() => handleCardClick(item)}>
              <img src={item.imgSrc} alt={item.title} />
              <div
                className="heart-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item.id);
                }}
                style={{
                  color: likedItems[item.id] ? "red" : "gray",
                  cursor: "pointer",
                  fontSize: "22px",
                  position: "absolute",
                  right: "10px",
                }}
              >
                {likedItems[item.id] ? "❤️" : "🤍"}
              </div>
              <div className="card-title">{item.title}</div>
              <div className="card-price">{item.price}</div>
              <div className="card-theme">Theme: {item.theme}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Buy;
