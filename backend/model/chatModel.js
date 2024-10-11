const mongoose = require('mongoose');
const { Schema: LikesSchema } = require('./likesModel'); 

const ChatChema = new mongoose.Schema({
  chatId: { type: Date, required: true },
});

module.exports = {
  Chat: mongoose.model('Chat', ChatChema),
};