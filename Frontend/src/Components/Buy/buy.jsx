import React from 'react';
import './buy.css';
import p1 from '../Assests/Pic1.webp';
import p2 from '../Assests/Pic2.webp';
import p3 from '../Assests/Pic3.webp';
import p4 from '../Assests/Pic4.webp';
import p5 from '../Assests/Pic5.webp';
import p6 from '../Assests/Pic6.jpg';
import p7 from '../Assests/Pic7.jpeg';
import p8 from '../Assests/Pic8.jpeg';
import p9 from '../Assests/Pic9.jpg';

function Buy() {
  // Array of item objects
  const items = [
    { id: 1, imgSrc: p1, title: "Mona Lisa Oil Painting", price: "$100.00", theme: "Historical" },
    { id: 2, imgSrc: p2, title: "The Everest Along with Nature", price: "$150.00", theme: "Nature" },
    { id: 3, imgSrc: p3, title: "Man inside a Painting", price: "$200.00", theme: "Modern" },
    { id: 4, imgSrc: p4, title: "The Fall in a Forest", price: "$175.00", theme: "Nature" },
    { id: 5, imgSrc: p5, title: "Abstract Colors", price: "$200.00", theme: "Modern" },
    { id: 6, imgSrc: p6, title: "Desert Mirage", price: "$200.00", theme: "Modern" },
    { id: 7, imgSrc: p7, title: "Cityscape Twilight", price: "$200.00", theme: "Modern" },
    { id: 8, imgSrc: p8, title: "Dreamy Landscape", price: "$200.00", theme: "Modern" },
    { id: 9, imgSrc: p9, title: "Lost in Thought", price: "$200.00", theme: "Modern" },
  ];

  return (
    <div className="app-container">
      {/* Search and Filter */}
      <div className="search-filter-container">
        <input type="text" placeholder="Search for Art, Type, Theme and more" className="search-bar" />
        <div className="icon">🔍</div>
        <select className="dropdown" defaultValue="Size">
          <option value="" disabled>Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="">None</option>
        </select>
        <select className="dropdown">
          <option value="" disabled>Filter</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
          <option value="newest-first">Newest First</option>
          <option value="">None</option>
        </select>
      </div>

      {/* Card Container */}
      <div className="card-container">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.imgSrc} alt={item.title} />
            <div className="heart-icon">❤️</div>
            <div className="card-title">{item.title}</div>
            <div className="card-price">{item.price}</div>
            <div className="card-theme">Theme: {item.theme}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buy;
