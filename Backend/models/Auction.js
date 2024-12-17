const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    startingBid: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    theme: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added userId
  },
  { timestamps: true, collection: 'auctions' }
);

module.exports = mongoose.model('Auction', AuctionSchema);
