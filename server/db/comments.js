const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  postId: Number,
  author: String,
  content: String,
  postedAt: Date
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;