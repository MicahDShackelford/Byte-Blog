import React from 'react';
import moment from 'moment';
import './Post.css';

let Post = (props) => {
  let post = props.post;
  let postText = post.post;
  if(postText && postText.length > 150) {
    postText = `${postText.slice(0, 500)}...`;
  }

  let postTime = post.postedTime;

  if(postTime) {
    postTime = moment(postTime).fromNow();
  }

  return (
    <div className="blog-post">
      <div className="blog-header">
        <h2>{post.title}</h2>
        <p>By: {post.author}</p>
        <p>{postTime}</p>
      </div>
      <div className="blog-body">
        <p>{postText}</p>
      </div>
      <a href="#" id={`viewpost-${props.i}`} onClick={props.handleClick}>Continue Reading</a>
    </div>
  )
}

export default Post;