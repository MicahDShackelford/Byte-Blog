import React, {useState, useEffect} from 'react';
import Comments from '../Comments/Comments';
import moment from 'moment';
import {fetchComments, fetchPost} from '../../util/dataFetch/fetch';
import './PostView.css';
import ParseMarkdown from '../../util/parseMarkdown';

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

  useEffect(() => {
    // const purifyBody = DOMPurify.sanitize(post.post);
    // const fixGT = purifyBody.replace(/&gt;+/g, '>');
    // const formattedBody = marked(fixGT, { breaks: true });
    ParseMarkdown(post.post)
      .then((body) => {
        document.getElementById("post-content-body").innerHTML = body;
      })
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
        <div id="post-content">
          <pre id="post-content-body"></pre>
        </div>
        <Comments comments={comments} />
      </div>
    </div>
  )
}

export default PostView;