const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  heading: {type: String, required: true} ,
  date: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: String, required: true },
  images: { type: [String], required: true },
});

module.exports = {
    News: mongoose.model('Event', EventSchema),
};