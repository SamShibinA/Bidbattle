const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Auction = require('../models/Auction'); // Import the Auction model

// Setup multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to create a new auction
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const {
      productName,
      description,
      startingBid,
      shippingFee,
      startDateTime, // Ensure these are coming from the body
      endDateTime, // Ensure these are coming from the body
      type,
      size,
      theme,
    } = req.body;

    // Check if the startDateTime and endDateTime are correctly passed
    if (!startDateTime || !endDateTime) {
      return res.status(400).json({ message: 'startDateTime and endDateTime are required' });
    }

    // Convert the startDateTime and endDateTime to Date objects
    const parsedStartDate = new Date(startDateTime);
    const parsedEndDate = new Date(endDateTime);

    // If the parsing fails, return an error
    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Process the image URL from multer
    const imageUrl = req.file ? req.file.path : '';

    // Create a new Auction document
    const auction = new Auction({
      productName,
      description,
      startingBid,
      shippingFee,
      startDateTime: parsedStartDate,
      endDateTime: parsedEndDate,
      type,
      size,
      theme,
      imageUrl,
    });

    // Save the auction to the database
    await auction.save();

    // Respond with success
    res.status(201).json({
      message: 'Auction created successfully!',
      auction,
    });
  } catch (error) {
    console.error('Error creating auction:', error);
    res.status(500).json({ message: 'Failed to create auction' });
  }
});

module.exports = router;
