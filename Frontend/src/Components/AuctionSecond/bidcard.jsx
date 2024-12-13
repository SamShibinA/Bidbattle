import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./bidcard.css"; // Ensure you have the styles

const BidCardAuction = () => {
  const location = useLocation();
  const {
    imageUrl,
    text = "Ends in", // Provide a default value
    title,
    theme,
    size,
    type,
    description,
    time,
  } = location.state || {}; // Destructure data passed via state

  const [bid, setBid] = useState("");
  const [highestBid, setHighestBid] = useState(90.0);
  const [bidder, setBidder] = useState("Mr.Anand");

  const handleBidSubmit = () => {
    if (parseFloat(bid) > highestBid) {
      setHighestBid(parseFloat(bid));
      setBidder("You"); // Update the bidder name
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
            src={`http://localhost:5000/${imageUrl}`} // Ensure the URL is correctly prefixed
            alt={title || "Artwork"} // Provide a fallback alt text
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
                color: text === "Ends in" ? "red" : "green", // Dynamically set color
              }}
            >
              {text}
            </span>{" "}
            <span className="countdown">{time}</span>
          </div>
          <hr />
          <div className="art-details">
            <h3>{title || "Untitled Artwork"}</h3>
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
