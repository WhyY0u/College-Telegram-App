const mongoose = require('mongoose');
const { Schema: LikesSchema } = require('./likesModel'); 

const NewsSchema = new mongoose.Schema({
  date: { type: String, required: true },
  heading: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: [LikesSchema], default: [] }, 
  images: { type: [String], required: false },
});

module.exports = {
  News: mongoose.model('News', NewsSchema), 
};
