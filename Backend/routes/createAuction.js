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
      startDateTime,
      endDateTime,
      type,
      size,
      theme,
    } = req.body;

    if (!startDateTime || !endDateTime) {
      return res.status(400).json({ message: 'startDateTime and endDateTime are required' });
    }

    const parsedStartDate = new Date(startDateTime);
    const parsedEndDate = new Date(endDateTime);

    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const imageUrl = req.file ? req.file.path : '';

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

// Route to fetch all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find(); // Fetch all auction items from the database
    res.status(200).json({ auctions });
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ message: 'Failed to fetch auctions' });
  }
});

module.exports = router;
