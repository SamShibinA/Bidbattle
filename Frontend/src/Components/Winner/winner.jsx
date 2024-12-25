import React, { useEffect, useState } from "react";
import "./winner.css";
import p1 from "../Assests/userlogo.png"; // Fallback image
import axios from "axios";
import { Link } from "react-router-dom";

const Winnercard = ({ productId }) => {
  const [topBidders, setTopBidders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const fetchTopBidders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bid/${productId}`);
        const bids = response.data.bids || [];
        
        if (bids.length === 0) {
          setErrorMessage("No bids found for this product");
        } else {
          setTopBidders(bids.slice(0, 3)); // Get the top 3 bidders
        }
      } catch (error) {
        console.error("Error fetching top bidders:", error);
        setErrorMessage("Failed to fetch bidders");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchTopBidders();
    }
  }, [productId]);

  useEffect(() => {
    if (topBidders.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, topBidders]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const itemWithShipping = {
    productId: productId,
    topBidder: topBidders[0], // This holds the top bidder's details
    timeLeft: timeLeft,
    productImage: topBidders[0]?.productImage || "", // Include the productImage field
    productName: topBidders[0]?.productName || "Product Name", // Fallback name
    bidAmount: topBidders[0]?.bidAmount || 0,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wincontainer">
      <div className="competition-container">
        <div className="competition-right">
          <div className="winner-header">
            <h2> 🏆 WINNERS</h2>
          </div>
          {errorMessage ? (
            <div className="no-bids-message">{errorMessage}</div>
          ) : (
            <div className="winner-list">
              {topBidders.map((bid, index) => (
                <div className="winner-item" key={bid._id}>
                  {/* Log profile image to the console for debugging */}
                  <div>{console.log('Profile Image URL:', bid.profileimage)}</div>
                  <img src={bid.profileimage || p1} alt={`Bidder ${index + 1}`} className="winprofile" />
                  <div className="winner-details">
                    <h3>{bid.username || "Anonymous"}</h3>
                    <p>Bid Amount: ${bid.bidAmount}</p>
                  </div>
                  {index === 0 && (
                    <div className="buy-now-container">
                      <Link to="/auctionpayment" state={itemWithShipping}>
                        <button className="buy-now-btn">Buy Now</button>
                      </Link>
                      <div className="countdown-timer">
                        {timeLeft > 0 ? (
                          <span>Time left: {formatTime(timeLeft)}</span>
                        ) : (
                          <span>Time's up!</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="competition-left">
          <div className="competition-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>OVER THE COMPETITION</h2>
          <p>Congratulations to the winner! Thank you for Participating in the Auction.</p>
        </div>
      </div>
    </div>
  );
};

export default Winnercard;
