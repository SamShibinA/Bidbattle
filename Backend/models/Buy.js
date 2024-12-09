const mongoose = require('mongoose');

const BuySchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    theme: { type: String, required: true },
  },
  { timestamps: true, collection: 'buy' }
);

module.exports = mongoose.model('Buy', BuySchema);
