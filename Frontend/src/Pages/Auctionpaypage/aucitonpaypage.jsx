import React from 'react';
import NavigationBar from '../../Components/Navbar/navbar';
import AuctionPay from '../../Components/AuctionPayment/auctionpay'; // Check file name and path here

const AuctionPaymentPage = () => {
  return (
    <div>
      <NavigationBar />
      <AuctionPay />
    </div>
  );
}

export default AuctionPaymentPage;
