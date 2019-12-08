import React from 'react';
import './styles/PostView.css';

let PostView = (props) => {
  let post = props.post;

  return (
    <div className="post-view">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p>By: {post.author}</p>
        <p>{post.postedTime.date} - {post.postedTime.time}</p>
      </div>
      <div className="post-body">
        <p>{post.post}</p>
      </div>
    </div>
  )
}

export default PostView;