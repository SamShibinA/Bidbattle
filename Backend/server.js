const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const path = require('path');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes); 
app.use('/api/profile', profileRoutes); // Profile routes


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});