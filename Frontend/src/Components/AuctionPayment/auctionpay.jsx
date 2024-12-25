import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './auctionpay.css';

const AuctionPaymentPage = () => {
  const location = useLocation();
  const { topBidder } = location.state || {}; // Access passed details from the state
  const [productImage, setProductImage] = useState('');

  if (!topBidder) {
    return <h2 className="error-message">No bid details available. Please try again.</h2>;
  }

  const escrowFees = 20;
  const itemsTotal = parseFloat(topBidder.bidAmount || 0); // Use bidAmount for price
  const shippingFees = topBidder.shippingFee || 10; // Default to 10 if no shipping fee is available
  const totalAmount = itemsTotal + shippingFees + escrowFees;

  // Fetch the auction image from the database using the auction ID
  useEffect(() => {
    const fetchAuctionImage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auctions/${topBidder.auctionId}`);
        if (response.data && response.data.auction) {
          setProductImage(`http://localhost:5000/${response.data.auction.imageUrl}`);
        }
      } catch (error) {
        console.error('Error fetching product image:', error);
        setProductImage('default-image-url.jpg'); // Fallback to a default image
      }
    };

    fetchAuctionImage();
  }, [topBidder.auctionId]);

  return (
    <div className="product-card-container">
      <div className="product-image">
        <img src={productImage} alt={topBidder.productName || 'Product Image'} />
      </div>
      <div className="product-details">
        <h1>{topBidder.productName || 'Product Name'}</h1>
        <h2>${itemsTotal.toFixed(2)}</h2>
        <p><b>Bidder:</b> {topBidder.username || 'Anonymous'}</p>
        <div className="price-details">
          <p><b>Items Total:</b> ${itemsTotal.toFixed(2)}</p>
          <p><b>Shipping Fees:</b> ${shippingFees.toFixed(2)}</p>
          <p><b>Escrow Fees:</b> ${escrowFees.toFixed(2)}</p>
          <hr />
          <p><strong>TOTAL: ${totalAmount.toFixed(2)}</strong></p>
        </div>
        <button className="payment-button">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default AuctionPaymentPage;
