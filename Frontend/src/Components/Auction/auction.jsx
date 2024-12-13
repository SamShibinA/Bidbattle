import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./auction.css";

const Auction = () => {
  const [items, setItems] = useState([]); // State to store auction items
  const [timeRemaining, setTimeRemaining] = useState({});

  // Function to calculate the remaining time for each item
  const calculateTimeRemaining = (endTime) => {
    const endDate = new Date(endTime);
    const currentDate = new Date();
    const remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      return "Expired";
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
  };

  // Fetch auction items from the backend
  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auction"); // Adjust to your API route
        const data = await response.json();
        setItems(data.auctions); // Set fetched auction items
      } catch (error) {
        console.error("Failed to fetch auction items:", error);
      }
    };

    fetchAuctionItems();
  }, []);

  useEffect(() => {
    // Set up the countdown interval for each item
    const interval = setInterval(() => {
      const updatedTimeRemaining = items.reduce((acc, item) => {
        acc[item._id] = calculateTimeRemaining(item.endDateTime);
        return acc;
      }, {});
      setTimeRemaining(updatedTimeRemaining);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="container">
      {items.map((item) => (
        <div key={item._id} className="card">
          <Link to="/BidcardAuction" state={item}>
            <img src={`http://localhost:5000/${item.imageUrl}`} alt="artwork" className="image" />
            <div className="text" style={{ color: "#C53742" }}>
              {item.productName}
            </div>
            <div className="time">
              {timeRemaining[item._id] || "Loading..."}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Auction;
