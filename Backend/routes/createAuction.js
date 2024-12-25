const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Auction = require('../models/Auction');
const { authenticateToken } = require('../middlewares/auth'); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
      userId: req.user.userId,
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


router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find().sort({ endDateTime: 1 }); 
    res.status(200).json({ auctions }); 
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ message: 'Failed to fetch auctions' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    res.status(200).json({ auction });
  } catch (error) {
    console.error('Error fetching auction:', error);
    res.status(500).json({ message: 'Failed to fetch auction' });
  }
});


module.exports = router;
