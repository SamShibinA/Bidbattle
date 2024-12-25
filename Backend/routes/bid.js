const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const Profile = require('../models/Profile');
const { authenticateToken } = require('../middlewares/auth');

// Add a new bid
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, bidAmount } = req.body;
    if (!productId || !bidAmount) {
      return res.status(400).json({ message: 'Product ID and bid amount are required' });
    }

    // Fetch the user's profile to get the username and profile image
    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Construct the profile picture URL like in profile.js
    const profilePictureURL = profile.profilePicture
      ? `${req.protocol}://${req.get('host')}/uploads/${profile.profilePicture}`
      : null;

    const newBid = new Bid({
      userId: req.user.userId, // Retrieved from the authenticated token
      username: profile.name,   // Using the profile name as the username
      profileimage: profilePictureURL,  // Store the profile image URL
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
    if (bids.length === 0) {
      return res.status(404).json({ message: 'No bids found for this product' });
    }
    res.status(200).json({ bids });
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
});

// Backend: Remove top bidder and promote second-highest bidder
router.post('/end-auction/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch the bids sorted by highest bid
    const bids = await Bid.find({ productId }).sort({ bidAmount: -1 });

    if (bids.length === 0) {
      return res.status(404).json({ message: 'No bids found for this product' });
    }

    // Remove top bidder's bid
    const topBidderId = bids[0].userId;
    await Bid.deleteMany({ productId, userId: topBidderId });

    // If there are at least 2 bids, promote the second bidder
    if (bids.length >= 2) {
      const secondBidder = bids[1];

      const newTopBid = new Bid({
        userId: secondBidder.userId,
        username: secondBidder.username,
        profileimage: secondBidder.profileimage,
        productId,
        bidAmount: secondBidder.bidAmount,
      });

      await newTopBid.save();
      res.status(200).json({ message: 'Auction ended. New winner is the second bidder' });
    } else {
      res.status(400).json({ message: 'Not enough bidders to shift the winner' });
    }
  } catch (error) {
    console.error('Error ending auction:', error);
    res.status(500).json({ message: 'Failed to end auction' });
  }
});

module.exports = router;
