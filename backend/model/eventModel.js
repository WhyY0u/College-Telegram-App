const mongoose = require('mongoose');
const { Schema: LikesSchema } = require('./likesModel'); 

const EventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  heading: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: [LikesSchema], default: [] }, 
  images: { type: [String], required: false },
  start: { type: Date, required: true },
  place: { type: String, required: true },
});

module.exports = {
  Event: mongoose.model('Event', EventSchema),
};