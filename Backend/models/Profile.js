const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  country: { type: String },
  profilePicture: { type: String },
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
