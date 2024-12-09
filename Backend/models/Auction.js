const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  startDateTime: { type: Date, required: true }, // Make sure it's Date and required
  endDateTime: { type: Date, required: true }, // Make sure it's Date and required
  type: { type: String, required: true },
  size: { type: String, required: true },
  theme: { type: String, required: true },
  imageUrl: { type: String },
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
