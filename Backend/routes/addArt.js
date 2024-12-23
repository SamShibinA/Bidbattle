const express = require('express');
const multer = require('multer');
const path = require('path');
const Buy = require('../models/Buy');
const { authenticateToken } = require('../middlewares/auth'); 

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });


router.post('/add', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    
    const userId = req.user.userId; 

    const { productName, description, price, shippingFee, type, size, theme } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newArt = new Buy({
      productName,
      imageUrl,
      description,
      price,
      shippingFee,
      type,
      size,
      theme,
      userId, 
    });

    await newArt.save();
    res.status(201).json({ message: 'Art added successfully!', art: newArt });
  } catch (err) {
    console.error('Error adding art:', err);
    res.status(500).json({ error: 'Failed to add art', details: err.message });
  }
});

// Endpoint to get all artworks (for Buy page)
router.get('/all', async (req, res) => {
  try {
    const allArtworks = await Buy.find(); 
    res.status(200).json(allArtworks);
  } catch (err) {
    console.error('Error fetching artworks:', err);
    res.status(500).json({ error: 'Failed to fetch artworks', details: err.message });
  }
});

// Endpoint to get logged-in user's artworks (for Remove Art page)
router.get('/user-art', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the token
    const userArtworks = await Buy.find({ userId }); // Filter by userId
    res.status(200).json(userArtworks);
  } catch (err) {
    console.error('Error fetching user artworks:', err);
    res.status(500).json({ error: 'Failed to fetch user artworks', details: err.message });
  }
});


router.delete('/remove/:id', authenticateToken, async (req, res) => {
  try {
    const artId = req.params.id;

    const deletedArt = await Buy.findByIdAndDelete(artId);

    if (!deletedArt) {
      return res.status(404).json({ message: 'Art not found' });
    }

    res.status(200).json({ message: 'Art removed successfully!' });
  } catch (err) {
    console.error('Error removing art:', err);
    res.status(500).json({ error: 'Failed to remove art', details: err.message });
  }
});


module.exports = router;
