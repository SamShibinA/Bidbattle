const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');


const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const addArtRoute = require('./routes/addArt');
const auctionRoutes = require('./routes/createAuction'); 
const favoriteRoutes = require('./routes/favorite'); 
const bidRoutes = require('./routes/bid'); // Import the bid routes


dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

mongoose
.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bidbattle')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});


app.use('/api', authRoutes); 
app.use('/api/profile', profileRoutes); 
app.use('/api/art', addArtRoute); 
app.use('/api/auction', auctionRoutes); 
app.use('/api/favorite', favoriteRoutes); 
app.use('/api/bid', bidRoutes); // Use the bid routes


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

