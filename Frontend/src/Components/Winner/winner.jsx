
import React, { useEffect, useState } from "react";
import "./winner.css";
import p1 from "../Assests/userlogo.png";
import axios from "axios";

const Winnercard = ({ productId }) => {
  const [topBidders, setTopBidders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchTopBidders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bid/${productId}`);
        const bids = response.data.bids || []; // Safely handle response.data.bids
        
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

          {/* Display error message if no bids are found */}
          {errorMessage ? (
            <div className="no-bids-message">{errorMessage}</div>
          ) : (
            <div className="winner-list">
              {topBidders.map((bid, index) => (
                <div className="winner-item" key={bid._id}>
                  <img src={bid.profile || p1} alt={`Bidder ${index + 1}`} className="winprofile" />
                  <div>
                    <h3>{bid.username || "Anonymous"}</h3>
                    <p>Bid Amount: ${bid.bidAmount}</p>
                  </div>
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
