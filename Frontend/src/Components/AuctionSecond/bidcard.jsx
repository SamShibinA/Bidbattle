import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  } = location.state || {};

  const [bid, setBid] = useState("");
  const [highestBid, setHighestBid] = useState(startingBid);
  const [bidder, setBidder] = useState("Not yet bidded");
  const [timeRemaining, setTimeRemaining] = useState("");

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

  const handleBidSubmit = () => {
    const bidValue = parseFloat(bid);
    if (bidValue > highestBid) {
      setHighestBid(bidValue);
      setBidder("You");
    } else {
      alert("Your bid must be higher than the current highest bid.");
    }
    setBid("");
  };

  return (
    <div className="fullscreen-container">
      <div className="bid-card">
        <div className="image-section">
          <img
            src={`http://localhost:5000/${imageUrl}`}
            alt={title || "Artwork"}
            className="bid-image"
          />
        </div>
        <div className="details-section">
          <h2>The Highest Bid</h2>
          <p>
            <strong>Bidder:</strong> {bidder}
          </p>
          <p>
            <strong>Bid Amount:</strong> ${highestBid.toFixed(2)}
          </p>
          <div className="bid-input">
            <input
              type="number"
              placeholder="Enter the bid"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
            <button onClick={handleBidSubmit}>BID</button>
          </div>
          <div className="timer">
            <span
              className="ends-in"
              style={{
                color: text === "Ends in" ? "red" : "green",
              }}
            >
              {text}
            </span>{" "}
            <span className="countdown">{timeRemaining}</span>
          </div>
          <hr />
          <div className="art-details">
            <h3>{productName || "Untitled Artwork"}</h3>
            <p>
              <strong>Theme:</strong> {theme || "Not specified"}
            </p>
            <p>
              <strong>Size:</strong> {size || "Not specified"}
            </p>
            <p>
              <strong>Type:</strong> {type || "Not specified"}
            </p>
            <p>
              <strong>Description:</strong> {description || "No description provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCardAuction;
