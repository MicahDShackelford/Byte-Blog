import React, {useState, useEffect} from 'react';
import Comments from '../Comments/Comments';
import moment from 'moment';
import DOMPurify from 'dompurify';
import {fetchComments, fetchPost} from '../../util/dataFetch/fetch';
import marked from 'marked';

import './PostView.css';

let PostView = (props) => {
  const [post, setPost] = useState({title: "null", author: "null", postedTime: null, post: "null"});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost(props.match.params.postId)
      .then((res) => {
        setPost(res[0]);
      })
    fetchComments(props.match.params.postId)
      .then((res) => {
        setComments(res);
      })
  },[]);

  let postTime = post.postedTime || new Date;
  // let formattedBody = post.post.split('\n') || [];
  useEffect(() => {
    const purifyBody = DOMPurify.sanitize(post.post);
    const formattedBody = marked(purifyBody);
    document.getElementById("post-content").innerHTML = formattedBody;
  },[post.post])

  return (
    <div className="post-view">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p>By: {post.author}</p>
        <p>{moment(postTime).format("MMM Do YY")}</p>
        <p>{moment(postTime).fromNow()}</p>
      </div>
      <div className="post-body">
        <p id="post-content"></p>
        {/* {formattedBody.map((paragraph, i) => (
          <div key={`${post.id}-block-${i}`}>
            <p>{marked(paragraph)}</p>
            <br />
          </div>
        ))} */}
        <Comments comments={comments} />
      </div>
    </div>
  )
}

export default PostView;