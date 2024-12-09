const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const addArtRoute = require('./routes/addArt');
const auctionRoutes = require('./routes/createAuction'); // Import auction route

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bidbattle')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api', authRoutes); // Auth routes
app.use('/api/profile', profileRoutes); // Profile routes
app.use('/api/art', addArtRoute); // Add Art routes
app.use('/api/auction', auctionRoutes); // Add auction route

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
