// Payment.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  const location = useLocation();
  const item = location.state; // Access passed item details

  if (!item) {
    return <h2 className="error-message">No item details available. Please try again.</h2>;
  }

  const escrowFees = 20; 
  const itemsTotal = parseFloat(item.bidAmount || 0); // Use bidAmount for price

  // Use the shipping fee from the item
  const shippingFees = item.shippingFee || 10; // Default to 10 if no shipping fee is available

  const totalAmount = itemsTotal + shippingFees + escrowFees;

  return (
    <div className="product-card-container">
      <div className="product-image">
        <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.productName} />
      </div>
      <div className="product-details">
        <h1>{item.productName}</h1>
        <h2>${itemsTotal.toFixed(2)}</h2>
        <p><b>Theme:</b> {item.theme}</p>
        <div className="price-details">
          <p><b>Items Total:</b> ${itemsTotal.toFixed(2)}</p>
          <p><b>Shipping Fees:</b> ${shippingFees.toFixed(2)}</p>
          <p><b>Escrow Fees:</b> ${escrowFees.toFixed(2)}</p>
          <hr />
          <p><strong>TOTAL: ${totalAmount.toFixed(2)}</strong></p>
        </div>
        <button className="payment-button">Make Payment</button>
      </div>
    </div>
  );
};

export default Payment;
