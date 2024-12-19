const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Buy", required: true }, // Reference to Buy table ID
  productName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  theme: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with User
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
