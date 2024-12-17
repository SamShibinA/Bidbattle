const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // Reference to Buy table ID
  productName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  theme: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
