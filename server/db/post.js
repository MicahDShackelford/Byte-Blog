const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  postedTime: String,
  post: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;