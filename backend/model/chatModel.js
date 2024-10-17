const mongoose = require('mongoose');

const ChatChema = new mongoose.Schema({
  chatId: { type: String, required: true },
});

module.exports = {
  Chat: mongoose.model('Chat', ChatChema),
};