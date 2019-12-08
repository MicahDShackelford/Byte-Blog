import React from 'react';
import './styles/Post.css';

let Post = (props) => {
  let post = props.post;
  let postText = post.post;
  if(postText && postText.length > 150) {
    postText = `${postText.slice(0, 500)}...`;
  }
  return (
    <div className="blog-post">
      <div className="blog-header">
        <h2>{post.title}</h2>
        <p>By: {post.author}</p>
        <p>{post.postedTime.date} - {post.postedTime.time}</p>
      </div>
      <div className="blog-body">
        <p>{postText}</p>
      </div>
      <a href="#" id={`viewpost-${props.i}`} onClick={props.handleClick}>Continue Reading</a>
    </div>
  )
}

export default Post;