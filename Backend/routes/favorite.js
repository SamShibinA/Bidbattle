const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite"); 
const Buy = require("../models/Buy"); 


router.get("/all", async (req, res) => {
  try {
    const favorites = await Favorite.find().populate("productId"); 
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    
    const product = await Buy.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    const existingFavorite = await Favorite.findOne({ productId });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Product is already in favorites" });
    }

    
    const newFavorite = new Favorite({
      productId: product._id,
      productName: product.productName,
      imageUrl: product.imageUrl,
      description: product.description,
      price: product.price,
      shippingFee: product.shippingFee,
      type: product.type,
      size: product.size,
      theme: product.theme,
      userId: userId || product.userId, 
    });

    await newFavorite.save();

    res.status(201).json({ message: "Added to favorites successfully", newFavorite });
  } catch (err) {
    console.error("Error adding to favorites:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/remove/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    await Favorite.findOneAndDelete({ productId });
    res.json({ message: "Removed from favorites successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
