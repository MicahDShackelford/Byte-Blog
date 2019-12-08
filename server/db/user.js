const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  username: String,
  password: String,
  email: String,
  dateRegistered: String,
  lastVisit: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;