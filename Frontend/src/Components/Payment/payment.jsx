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

  // Calculate total (Items Total + Shipping Fees + Escrow Fees)
  const escrowFees = 20; // Fixed escrow fees
  const itemsTotal = parseFloat(item.price.replace('$', '')); // Remove dollar sign and convert to number
  const shippingFees = parseFloat(item.shippingprice.replace('$', '')); // Remove dollar sign and convert to number
  const totalAmount = itemsTotal + shippingFees + escrowFees; // Sum up the totals

  return (
    <div className="product-card-container">
      <div className="product-image">
        <img src={item.imgSrc} alt={item.title} />
      </div>
      <div className="product-details">
        <h1>{item.title}</h1>
        <h2>{item.price}</h2>
          <p>Theme: {item.theme}</p>
        <div className="price-details">
          <p><b>Items Total:</b> {item.price}</p>
          <p><b>Shipping Fees:</b> {item.shippingprice}</p>
          <p><b>Sescrow Fees:</b> ${escrowFees}</p>
          <hr />
          <p><strong>TOTAL: ${totalAmount}</strong></p>
        </div>
        <button className="payment-button">Make Payment</button>
      </div>
    </div>
  );
};

export default Payment;
