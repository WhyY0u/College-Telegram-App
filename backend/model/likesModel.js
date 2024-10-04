const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
  user_id: { type: String, required: true },  
  post_id: { type: String, required: true }, 
  type: { type: String, enum: ['Меоприятие', 'Новости'], required: true },
});

const Type = Object.freeze({
  Event: 'Меоприятие',
  News: 'Новости',
});

module.exports = {
  Likes: mongoose.model('Likes', LikesSchema),  
  Schema: LikesSchema,  
  Type,  
};
