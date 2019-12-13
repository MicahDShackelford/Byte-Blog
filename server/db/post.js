const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  id: Number,
  title: String,
  author: Object,
  postedTime: Date,
  post: String,
  likes: Number,
  comments: Object
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;