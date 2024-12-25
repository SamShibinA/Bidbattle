import React, { useEffect, useState } from "react";
import "./winner.css";
import p1 from "../Assests/userlogo.png";
import axios from "axios";

const Winnercard = ({ productId }) => {
  const [topBidders, setTopBidders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    // Fetch top bidders when productId is available
    const fetchTopBidders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bid/${productId}`);
        const bids = response.data.bids || [];
        
        if (bids.length === 0) {
          setErrorMessage("No bids found for this product");
        } else {
          setTopBidders(bids.slice(0, 3)); // Get top 3 bidders
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
    // Start the countdown only when the first bidder is available
    if (topBidders.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer); // Stop the countdown when it hits 0
            return 0;
          }
          return prevTime - 1; // Decrease the time by 1 second
        });
      }, 1000);

      // Cleanup the timer on component unmount
      return () => clearInterval(timer);
    }
  }, [timeLeft, topBidders]);

  // Format the time into MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
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
                  <img src={bid.profileimage || p1} alt={`Bidder ${index + 1}`} className="winprofile" />
                  <div className="winner-details">
                    <h3>{bid.username || "Anonymous"}</h3>
                    <p>Bid Amount: ${bid.bidAmount}</p>
                  </div>
                  {/* Only show "Buy Now" button for the first bidder */}
                  {index === 0 && (
                    <div className="buy-now-container">
                      <button className="buy-now-btn">Buy Now</button>
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
          <p>
            Congratulations to the winner! Thank you for Participating in the Auction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Winnercard;
