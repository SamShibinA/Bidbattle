import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./auction.css";
import axios from "axios";

const Auction = () => {
  const [items, setItems] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [selectedExpiredItem, setSelectedExpiredItem] = useState(null);
  const navigate = useNavigate();

  const calculateTimeRemaining = (startTime, endTime) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const currentDate = new Date();

    if (currentDate < startDate) {
      const remainingTime = startDate - currentDate;
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      return { status: "Starts in", time: `${days}d:${hours}h:${minutes}m:${seconds}s` };
    } else if (currentDate < endDate) {
      const remainingTime = endDate - currentDate;
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      return { status: "Ends in", time: `${days}d:${hours}h:${minutes}m:${seconds}s` };
    } else {
      return { status: "Expired", time: "Expired" };
    }
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
        acc[item._id] = calculateTimeRemaining(item.startDateTime, item.endDateTime);
        return acc;
      }, {});
      setTimeRemaining(updatedTimeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const handleItemClick = (item) => {
    const itemStatus = timeRemaining[item._id]?.status;

    if (itemStatus === "Starts in") {
      alert("The auction has not started yet.");
      return;
    }

    if (itemStatus === "Expired" && isProfileComplete) {
      setSelectedExpiredItem(item); // Set the expired item to display the Winnercard
      navigate("/Winnerpage", { state: { productId: item._id } }); // Pass the productId
      return;
    }

    if (!isProfileComplete) {
      alert("Please complete your profile to proceed.");
      navigate("/Edit Profile");
    } else {
      navigate("/BidcardAuction", { state: item });
    }
  };

  return (
    <div className="container">
      {selectedExpiredItem ? (
        navigate("/Winnerpage", { state: { productId: selectedExpiredItem._id } })
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id} className="card" onClick={() => handleItemClick(item)}>
              <img
                src={`http://localhost:5000/${item.imageUrl}`}
                alt={item.productName}
                className="image"
              />
              <div className="text" style={{ color: "#C53742" }}>
                {item.productName}
              </div>
              <div
                className="auction-status"
                style={{ color: "red", fontWeight: "bold" }}
              >
                {timeRemaining[item._id]?.status}:
              </div>
              <div className="time">
                {timeRemaining[item._id]?.time || "Loading..."}
              </div>
            </div>
          ))}
          {items.length === 0 && <p>No active auctions at the moment.</p>}
        </>
      )}
    </div>
  );
};

export default Auction;
