import React from 'react';
import moment from 'moment';
import {FaHeart, FaComment} from 'react-icons/fa';
import {Link} from 'react-router-dom';
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

  let handleClick = (e) => {
    e.preventDefault();
  }

  return (
    <div className="blog-post">
      <div className="blog-header">
        <div className="blog-head-left">
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
        <div className="vert-divider">&nbsp;</div>
        <div className="blog-head-right">
          <div class="float-left">
            <p>By: {post.author.name}</p>
            <p>{postTime}</p>
          </div>
          <div className="float-right">
            <img classname="user-avatar" src={post.author.avatar}></img>
          </div>
        </div>
      </div>
      <div className="blog-post-body">
        <p>{postText}</p>
      </div>
      <div className="blog-post-footer">
        <div className="blog-foot-left">
          <Link to={`/post/${post.id}`}>
            <button>Continue Reading</button>
          </Link>
        </div>
        <div className="blog-foot-right">
          <Link className="blog-foot-category">General</Link> <p>/</p>
          <Link className="blog-foot-comment"><FaComment size="0.8em"/> {post.comments.count}</Link> <p>/</p>
          <Link className="blog-foot-like"><FaHeart size="0.8em"/> {post.likes}</Link>
        </div>
      </div>
    </div>
  )
}

export default Post;