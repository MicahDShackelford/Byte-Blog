import React from 'react';
import './styles/Post.css';

let Post = (props) => {
  let post = props.post;
  return (
    <div className="blog-post">
      <h3>{post.title}</h3>
      <p>By: {post.author}</p>
      <p>{post.postedTime.date} - {post.postedTime.time}</p>
      <p>{post.post}</p>
    </div>
  )
}

export default Post;