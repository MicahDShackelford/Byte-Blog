import React, {useState, useEffect} from 'react';
import Comments from '../Comments/Comments';
import moment from 'moment';
import './PostView.css';

let PostView = (props) => {
  const [post, setPost] = useState({title: "null", author: "null", postedTime: "null", post: "null"});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchComments();
  },[]);

  const fetchPosts = () => {
    fetch(`/post/retrieve/${props.match.params.postId}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setPost(res[0]);
    })
  }

  const fetchComments = () => {
    fetch(`/comments/retrieve/${props.match.params.postId}`)
    .then((res) => {
      return res.json();
    }).then((res) => {
      setComments(res);
    })
  }

  let postTime = post.postedTime || null;
  let formattedBody = post.post.split('\n') || [];

  return (
    <div className="post-view">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p>By: {post.author.name}</p>
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
        <Comments comments={comments} />
      </div>
    </div>
  )
}

export default PostView;