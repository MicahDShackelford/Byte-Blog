import React from 'react';
import moment from 'moment';
import './PostView.css';

let PostView = (props) => {
  let post = props.post;
  let postTime = post.postedTime;

  let formattedBody = post.post.split('\n');

  return (
    <div className="post-view">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p>By: {post.author}</p>
        <p>{moment(postTime).format("MMM Do YY")}</p>
        <p>{moment(postTime).fromNow()}</p>
      </div>
      <div className="post-body">
        {formattedBody.map((paragraph, i) => (
          <div key={`${post.id}-block-${i}`}>
            <p>{paragraph}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostView;