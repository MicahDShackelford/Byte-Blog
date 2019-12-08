import React from 'react';
import Post from './Post';
import './styles/PostsView.css';

let PostsView = (props) => {
  let posts = props.posts;
  return (
    <div id="posts-view">
      <div className="container">
        {(posts.reverse()).map((post) => (
          <Post post={post} key={`post-${post.id}`}/>
        ))}
      </div>
    </div>
  )
}

export default PostsView;