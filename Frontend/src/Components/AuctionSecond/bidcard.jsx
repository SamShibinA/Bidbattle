import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import "./bidcard.css";

const BidCardAuction = () => {
  const location = useLocation();
  const {
    imageUrl,
    text = "Ends in",
    title,
    theme,
    size,
    type,
    description,
    time,
    startingBid = 0, // Default to 0 if not provided
    endDateTime,
    productName,
    _id: auctionId,
  } = location.state || {};

  const [bid, setBid] = useState("");
  const [highestBid, setHighestBid] = useState(startingBid);
  const [bidder, setBidder] = useState("Not yet bidded");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [user, setUser] = useState(null); // Store the logged-in user
  const [statusMessage, setStatusMessage] = useState(""); // Store status messages

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
    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining(endDateTime));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endDateTime]);

  useEffect(() => {
    // Fetch the logged-in user details (username) and the highest bid info
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    const fetchBids = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bid/${auctionId}`);
        if (response.data.bids.length > 0) {
          const highestBid = response.data.bids[0].bidAmount;
          const bidderName = response.data.bids[0].username;
          setHighestBid(highestBid);
          setBidder(bidderName);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    fetchUser();
    fetchBids();
  }, [auctionId]);

  const handleBidSubmit = async () => {
    const bidValue = parseFloat(bid);
    if (bidValue > highestBid) {
      try {
        // Save the new bid
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/bid/add",
          { productId: auctionId, bidAmount: bidValue },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStatusMessage("Your bid has been placed successfully!"); // Show success message
        setBid(""); // Reset bid input field
        setHighestBid(bidValue); // Update highest bid
        setBidder(user?.name || "You"); // Set "You" for the logged-in user
      } catch (error) {
        console.error("Error adding bid:", error);
        setStatusMessage("Failed to place bid. Please try again.");
      }
    } else {
      setStatusMessage("Your bid must be higher than the current highest bid.");
    }
  };

  return (
    <div className="fullscreen-container">
      <div className="bid-card">
        <div className="image-section">
          <img src={`http://localhost:5000/${imageUrl}`} alt={title || "Artwork"} className="bid-image" />
        </div>
        <div className="details-section">
          <h2>The Highest Bid</h2>
          <p><strong>Bidder:</strong> {bidder === user?.name ? "You" : bidder}</p> {/* Display "You" if the current user is the highest bidder */}
          <p><strong>Bid Amount:</strong> ${highestBid.toFixed(2)}</p>
          <div className="bid-input">
            <input
              type="number"
              placeholder="Enter the bid"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
            <button onClick={handleBidSubmit}>BID</button>
          </div>
          {statusMessage && <p className="status-message">{statusMessage}</p>} {/* Display status message */}
          <div className="timer">
            <span className="ends-in" style={{ color: text === "Ends in" ? "red" : "green" }}>
              {text}
            </span>
            <span className="countdown">{timeRemaining}</span>
          </div>
          <hr />
          <div className="art-details">
            <h3>{productName || "Untitled Artwork"}</h3>
            <p><strong>Theme:</strong> {theme || "Not specified"}</p>
            <p><strong>Size:</strong> {size || "Not specified"}</p>
            <p><strong>Type:</strong> {type || "Not specified"}</p>
            <p><strong>Description:</strong> {description || "No description provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCardAuction;
