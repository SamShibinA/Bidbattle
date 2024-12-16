const express = require('express');
const multer = require('multer');
const path = require('path');
const Buy = require('../models/Buy'); // Model for Buy collection

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
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { productName, description, price, shippingFee, type, size, theme } = req.body;
    const newArt = new Buy({
      productName,
      imageUrl: req.file.path, // Path to the uploaded image
      description,
      price,
      shippingFee,
      type,
      size,
      theme,
    });

    await newArt.save();
    res.status(201).json({ message: 'Art added successfully!', art: newArt });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add art', details: err.message });
  }
});

// Route to fetch all artworks from the database
router.get('/all', async (req, res) => {
  try {
    const allArtworks = await Buy.find(); // Fetch all items from the Buy collection
    res.status(200).json(allArtworks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artworks', details: err.message });
  }
});

// Route to remove artwork by its ID
router.delete('/remove/:id', async (req, res) => {
  try {
    const artId = req.params.id;
    const deletedArt = await Buy.findByIdAndDelete(artId); // Delete artwork by its ID

    if (!deletedArt) {
      return res.status(404).json({ error: 'Art not found' });
    }

    res.status(200).json({ message: 'Art removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove art', details: err.message });
  }
});

module.exports = router;
