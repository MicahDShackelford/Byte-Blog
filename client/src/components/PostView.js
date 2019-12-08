import React from 'react';
import moment from 'moment';
import './styles/PostView.css';

let PostView = (props) => {
  let post = props.post;
  let postTime = post.postedTime;

  return (
    <div className="post-view">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p>By: {post.author}</p>
        <p>{moment(postTime).format("MMM Do YY")}</p>
        <p>{moment(postTime).fromNow()}</p>
      </div>
      <div className="post-body">
        <p>{post.post}</p>
      </div>
    </div>
  )
}

export default PostView;