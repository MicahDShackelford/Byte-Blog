const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  id: Number,
  postId: Number,
  author: String,
  content: String,
  postedAt: {type:Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;