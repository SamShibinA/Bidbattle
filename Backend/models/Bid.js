const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: false }, // Username of the bidder
    profileimage:{type:String},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
    bidAmount: { type: Number, required: true },
  
  },
  { timestamps: true, collection: 'bids' }
);

module.exports = mongoose.model('Bid', BidSchema);
