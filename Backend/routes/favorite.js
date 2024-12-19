const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite"); // Import the Favorite model
const Buy = require("../models/Buy"); // Import the Buy model

// Route to get all favorites
router.get("/all", async (req, res) => {
  try {
    const favorites = await Favorite.find().populate("productId"); // Populate to get full product details
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a favorite (fetch full details from Buy table)
router.post("/add", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    // Fetch the product details from the Buy table
    const product = await Buy.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in favorites
    const existingFavorite = await Favorite.findOne({ productId });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Product is already in favorites" });
    }

    // Create a new favorite item with all product details
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
      userId: userId || product.userId, // Assign the userId from the body or from product
    });

    // Save the favorite item to the database
    await newFavorite.save();

    res.status(201).json({ message: "Added to favorites successfully", newFavorite });
  } catch (err) {
    console.error("Error adding to favorites:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to remove a favorite by productId
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
