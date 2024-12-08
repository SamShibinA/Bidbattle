const express = require('express');
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'), // Save files in "backend/uploads"
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Get profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, phone, city, state, pincode, country } = req.body;
    const profilePicture = req.file?.filename;

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $set: {
          name,
          phone,
          city,
          state,
          pincode,
          country,
          ...(profilePicture && { profilePicture }),
        },
      },
      { new: true, upsert: true } // Create new profile if not exists
    );

    res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;