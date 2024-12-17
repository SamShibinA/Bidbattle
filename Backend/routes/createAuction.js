const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Auction = require('../models/Auction');
const { authenticateToken } = require('../middlewares/auth'); // Import authenticateToken

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
router.post('/create', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const {
      productName,
      description,
      startingBid,
      shippingFee,
      startDateTime,
      endDateTime,
      type,
      size,
      theme,
    } = req.body;

    // Validate required fields
    if (!startDateTime || !endDateTime) {
      return res.status(400).json({ message: 'startDateTime and endDateTime are required' });
    }

    const parsedStartDate = new Date(startDateTime);
    const parsedEndDate = new Date(endDateTime);

    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Get the image URL from the uploaded file
    const imageUrl = req.file ? req.file.path : '';

    // Create a new auction document
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
      userId: req.user.userId, // Store the userId from the JWT
    });

    // Save the auction to the database
    await auction.save();

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
