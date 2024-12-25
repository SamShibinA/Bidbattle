// BuyCard.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./buycard.css";

const BuyCard = () => {
  const location = useLocation(); 
  const item = location.state;

  if (!item) {
    return <h2 className="error-message">No item details available. Please select an item.</h2>;
  }

  const itemWithShipping = { 
    ...item, 
    shippingprice: item.shippingprice || "15", // Default shipping price
    bidAmount: item.price // Pass price as bidAmount
  };

  return (
    <div className="buycard-container">
      <div className="bid-card">
        <div className="buycard-image">
          <img
            src={`http://localhost:5000/${item.imageUrl}`}
            alt={item.productName}
          />
        </div>
        <div className="vertical-line"></div> 
        <div className="buycard-details">
          <h1>{item.productName}</h1>
          <h2>${item.price}</h2>
          <p>
            <strong>Theme:</strong> {item.theme}
          </p>
          {item.size && (
            <p>
              <strong>Size:</strong> {item.size}
            </p>
          )}
          {item.type && (
            <p>
              <strong>Type:</strong> {item.type}
            </p>
          )}
          {item.description && (
            <>
              <p>
                <strong>Description:</strong>
              </p>
              <p>{item.description}</p>
            </>
          )}
          <div className="buycard-actions">
            <Link to="/payment" state={itemWithShipping}>
              <button className="btn-buy" style={{alignItems: "center"}}>BUY</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
