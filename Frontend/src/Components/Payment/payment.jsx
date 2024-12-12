import React from "react";
import { useLocation } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  const location = useLocation();
  const item = location.state; // Access the passed state (item data)

  // Check if item is undefined (fallback if navigated without data)
  if (!item) {
    return <h2 className="error-message">No item details available. Please try again.</h2>;
  }

  // Safely parse prices and set defaults
  const escrowFees = 20; // Fixed escrow fees
  const itemsTotal = parseFloat(item.price || 0); // Default to 0 if price is missing
  const shippingFees = parseFloat(item.shippingprice || 0); // Default to 0 if shipping price is missing
  const totalAmount = itemsTotal + shippingFees + escrowFees;

  return (
    <div className="product-card-container">
      <div className="product-image">
        <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.productName} />
      </div>
      <div className="product-details">
        <h1>{item.productName}</h1>
        <h2>${item.price}</h2>
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
