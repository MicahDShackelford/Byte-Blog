const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  id: {type: Number, require: true},
  title: String,
  topic: String,
  author: String,
  post: String,
  postedTime: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
