import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./auction.css";

const Auction = () => {
  const [items, setItems] = useState([]); 
  const [timeRemaining, setTimeRemaining] = useState({}); 


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

 
  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auction"); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data.auctions); 
      } catch (error) {
        console.error("Failed to fetch auction items:", error);
      }
    };

    fetchAuctionItems();
  }, []);

  useEffect(() => {
   
    const interval = setInterval(() => {
      const updatedTimeRemaining = items.reduce((acc, item) => {
        acc[item._id] = calculateTimeRemaining(item.endDateTime);
        return acc;
      }, {});
      setTimeRemaining(updatedTimeRemaining);
    }, 1000); 

    return () => clearInterval(interval);
  }, [items]);

  
  const activeItems = items.filter((item) => calculateTimeRemaining(item.endDateTime) !== "Expired");

  return (
    <div className="container">
      {activeItems.map((item) => (
        <div key={item._id} className="card">
          <Link to="/BidcardAuction" state={item}>
            <img
              src={`http://localhost:5000/${item.imageUrl}`}
              alt={item.productName}
              className="image"
            />
            <div className="text" style={{ color: "#C53742" }}>
              {item.productName}
            </div>
            <div className="ends-in" style={{ color: "red", fontWeight: "bold" }}>
              Ends in:
            </div>
            <div className="time">
              {timeRemaining[item._id] || "Loading..."}
            </div>
          </Link>
        </div>
      ))}
      {activeItems.length === 0 && <p>No active auctions at the moment.</p>}
    </div>
  );
};

export default Auction;
