const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const Profile = require('../models/Profile');  // Import the Profile model
const { authenticateToken } = require('../middlewares/auth');

// Add a new bid
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, bidAmount } = req.body;
    if (!productId || !bidAmount) {
      return res.status(400).json({ message: 'Product ID and bid amount are required' });
    }

    // Fetch the user's profile to get the username
    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const newBid = new Bid({
      userId: req.user.userId, // Retrieved from the authenticated token
      username: profile.name,   // Using the profile name as the username
      productId,
      bidAmount,
    });

    await newBid.save();
    res.status(201).json({ message: 'Bid added successfully', bid: newBid });
  } catch (error) {
    console.error('Error adding bid:', error);
    res.status(500).json({ message: 'Failed to add bid' });
  }
});

// Fetch all bids for a specific product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const bids = await Bid.find({ productId }).sort({ bidAmount: -1 }); // Sort by highest bid
    res.status(200).json({ bids });
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
});

module.exports = router;
