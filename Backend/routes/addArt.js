const express = require('express');
const multer = require('multer');
const path = require('path');
const Buy = require('../models/Buy');
const { authenticateToken } = require('../middlewares/auth'); // Import authentication middleware

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});
const upload = multer({ storage });

// Route to handle "Add Art"
router.post('/add', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    // Extract userId from the authenticated user (from the token)
    const userId = req.user.userId; // This is set by the authenticateToken middleware

    // Destructure the form data
    const { productName, description, price, shippingFee, type, size, theme } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Path to the uploaded image file

    // Create a new artwork entry in the database
    const newArt = new Buy({
      productName,
      imageUrl,
      description,
      price,
      shippingFee,
      type,
      size,
      theme,
      userId, // Associate the artwork with the authenticated user
    });

    // Save the artwork to the database
    await newArt.save();
    res.status(201).json({ message: 'Art added successfully!', art: newArt });
  } catch (err) {
    console.error('Error adding art:', err);
    res.status(500).json({ error: 'Failed to add art', details: err.message });
  }
});

// Route to fetch all artworks from the database
router.get('/all', async (req, res) => {
  try {
    const allArtworks = await Buy.find(); // Fetch all items from the Buy collection
    res.status(200).json(allArtworks);
  } catch (err) {
    console.error('Error fetching artworks:', err);
    res.status(500).json({ error: 'Failed to fetch artworks', details: err.message });
  }
});

module.exports = router;
