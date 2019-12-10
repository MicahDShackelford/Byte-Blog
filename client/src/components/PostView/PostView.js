import React, {useState, useEffect} from 'react';
import moment from 'moment';
import './PostView.css';

let PostView = (props) => {
  const [post, setPost] = useState({title: "null", author: "null", postedTime: "null", post: "null"});

  useEffect(() => {
    fetchPosts();
  },[]);

  const fetchPosts = () => {
    fetch(`http://127.0.0.1:3000/post/retrieve/${props.match.params.postId}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setPost(res[0]);
    })
  }

  let postTime = post.postedTime || null;
  let formattedBody = post.post.split('\n') || [];

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