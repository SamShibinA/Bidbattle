const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import authentication routes

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process if the connection fails
  });

// Routes
app.use('/api', authRoutes); // Mount authentication routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
