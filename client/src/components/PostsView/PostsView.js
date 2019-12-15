import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./PostsView.css";
import { fetchAllPosts } from "../../util/dataFetch/fetch";

let PostsView = props => {
  const [posts, setPosts] = useState(
    [
      {
        title: null,
        author: null,
        postedTime: null,
        post: null,
        comments: null
      }
    ],
  ); // 0 - Guest, 1 - Member, 2- Moderator, 3 - Admin

  useEffect(() => {
    fetchAllPosts().then(res => {
      setPosts(res);
    });
  },[]);
  return (
    <div id="posts-view">
      <div className="container">
        {posts.map((post, i) => (
          <Post
            handleClick={props.handleClick}
            post={post}
            key={`post-${post.id}`}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsView;
