const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
});

module.exports = {
  Profile: mongoose.model('Profile', ProfileSchema),
};