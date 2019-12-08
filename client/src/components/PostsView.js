import React from 'react';
import Post from './Post';
import './styles/PostsView.css';

let PostsView = (props) => {
  let posts = props.posts;
  return (
    <div id="posts-view">
      <div className="container">
        {posts.map((post, i) => (
          <Post handleClick={props.handleClick} post={post} key={`post-${post.id}`} i={i}/>
        ))}
      </div>
    </div>
  )
}

export default PostsView;