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

router.get('/all', async (req, res) => {
  try {
    const allArtworks = await Buy.find(); 
    res.status(200).json(allArtworks);
  } catch (err) {
    console.error('Error fetching artworks:', err);
    res.status(500).json({ error: 'Failed to fetch artworks', details: err.message });
  }
});

module.exports = router;
