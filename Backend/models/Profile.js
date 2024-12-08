const mongoose = require('mongoose');

// Define the profile schema
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  name: { type: String },
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  country: { type: String },
  profilePicture: { type: String }, // File path or URL for the profile picture
});

// Create and export the model
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
