import React, {useState, useEffect} from 'react';
import createPost from '../../util/dataFetch/createPost';
import PostPreview from '../PostPreview/PostPreview';
import './CreatePost.css';
import TabIndent from '../../util/tabIndent';


let CreatePost = (props) => {
  const [post, setPost] = useState({});
  const [view, setView] = useState("createpost");

  let previewHandler = (e) => {
    e.preventDefault();
    // setPost({
    //   name: props.user.username,
    //   title: e.target.parentNode.parentNode[0].value,
    //   body: e.target.parentNode.parentNode[1].value
    // })
    // setView("postpreview");
  }

  let createPostHandler = (e) => {
    if(e.preventDefault){
      e.preventDefault();
      setPost({
        title: e.target[0].value,
        topic: e.target[1].value,
        author: props.user.username,
        post: e.target[2].value
      })
    }
  }
  useEffect(() => {
    TabIndent('post-body');
  }, []);
  useEffect(() => {
    if(post.title && post.topic && post.author && post.post) {
      console.log(post)
      createPost(post);
    }
  },[post])

  if(view === "createpost") {
    return (
      <div id="create-post">
        <form onSubmit={createPostHandler}>
          <div className="form-group">
            <label htmlFor="post-title">Title</label>
            <input type="text" id="post-title"></input>
          </div>
          <div className="form-group">
            <label htmlFor="post-topic">Topic</label>
            <input type="text" id="post-topic"></input>
          </div>
          <div className="form-group form-body">
            <label htmlFor="post-title">Body</label>
            <textarea id="post-body"></textarea>
          </div>
          <div className="button-group">
            <button onClick={previewHandler}>Preview Post</button>
            <button type="submit">Submit Post</button>
          </div>
        </form>
      </div>
    )
  }else if(view === "postpreview") {
    return (
      <PostPreview post={post} />
    )
  }
}

export default CreatePost;