const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const Buy = require("../models/Buy");
const { authenticateToken } = require("../middlewares/auth");

// Fetch all favorites for the authenticated user
router.get("/all", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract userId from the authenticated token
    const favorites = await Favorite.find({ userId }).populate("productId"); // Fetch only favorites for this user
    res.json(favorites);
  } catch (err) {
    console.error("Error fetching user favorites:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a product to favorites
router.post("/add", authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId; // Extract userId from the authenticated token

  try {
    const product = await Buy.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in favorites
    const existingFavorite = await Favorite.findOne({ productId, userId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Product is already in favorites" });
    }

    // Create a new favorite
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
      userId, // Use the userId from the token
    });

    await newFavorite.save();

    res.status(201).json({ message: "Added to favorites successfully", newFavorite });
  } catch (err) {
    console.error("Error adding to favorites:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove a product from favorites
router.delete("/remove/:productId", authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId; // Extract userId from the authenticated token

  try {
    const deletedFavorite = await Favorite.findOneAndDelete({ productId, userId });
    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Removed from favorites successfully" });
  } catch (err) {
    console.error("Error removing from favorites:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
