import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auction.css";
import axios from "axios";

const Auction = () => {
  const [items, setItems] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const navigate = useNavigate();

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

    fetchAuctionItems();
    checkProfileCompletion();
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

  const handleItemClick = (item) => {
    if (!isProfileComplete) {
      alert("Please complete your profile to proceed.");
      navigate("/Edit Profile");
    } else {
      navigate("/BidcardAuction", { state: item });
    }
  };

  const activeItems = items.filter((item) => calculateTimeRemaining(item.endDateTime) !== "Expired");

  return (
    <div className="container">
      {activeItems.map((item) => (
        <div key={item._id} className="card" onClick={() => handleItemClick(item)}>
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
          <div className="time">{timeRemaining[item._id] || "Loading..."}</div>
        </div>
      ))}
      {activeItems.length === 0 && <p>No active auctions at the moment.</p>}
    </div>
  );
};

export default Auction;
