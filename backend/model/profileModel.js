const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
});

module.exports = {
  Event: mongoose.model('Profile', ProfileSchema),
};