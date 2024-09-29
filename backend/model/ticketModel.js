const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  creatorid: { type: mongoose.Schema.Types.ObjectId, required: true },
  heading: {type: String, required: true} ,
  status: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: {type: String, require: false},
  comment: {type: String, require: false},
  moderator_id: {type: String, require: false}
});

const type = Object.freeze({
    Complaint: 'Жалоба',
    Offer: 'Предложение',
});

const status = Object.freeze({
    Denied: 'Отказано',
    Done: 'Выполнено',
    Sent: 'Отправлено',
    InProgress: 'Выполняется',
});


module.exports = {
    Ticket: mongoose.model('Ticket', ticketSchema),
    Type: type,
    Status: status,
};