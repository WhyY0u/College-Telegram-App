const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  date: { type: String, required: true },
  heading: {type: String, required: true} ,
  description: { type: String, required: true },
  likes: { type: String, required: true },
  images: { type: [String], required: true },
  start: { type: String, required: true },
  place: { type: String, required: true },
});


module.exports = {
    News: mongoose.model('News', NewsSchema),
};