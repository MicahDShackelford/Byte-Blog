import React from 'react';
import './PostPreview.css';

let PostPreview = (props) => {
  let formattedBody = props.post.body.split('\n');
  return (
    <div id="post-preview">
      <h1>{props.post.title}</h1>
      {formattedBody.map((block, i) =>(
        <div key={`preview-post-block-${i}`}>
          <p>{block}</p>
          <br />
        </div>
      ))}
    </div>
  )
}

export default PostPreview;