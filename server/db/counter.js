const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
  model: String,
  count: {type: Number, default: 0}
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;