const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true },
  name: { type: String, required: true },
  surname: {type: String, required: true} ,
  patronymic: {type: String, required: true} ,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  token: {type: String, require: true}
});

const role = Object.freeze({
  Student: 'Student',
  Confidant: 'Confidant',
});



module.exports = {User: mongoose.model('User', UserSchema),
                  Role: role
};