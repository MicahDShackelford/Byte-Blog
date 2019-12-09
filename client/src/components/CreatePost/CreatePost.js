import React, {useState} from 'react';
import PostPreview from '../PostPreview/PostPreview';
import './CreatePost.css';


let CreatePost = () => {
  const [post, setPost] = useState({});
  const [view, setView] = useState("createpost");

  let previewHandler = (e) => {
    e.preventDefault();
    setPost({
      name: "undefined",
      createdAt: "undefined",
      title: e.target.parentNode.parentNode[0].value,
      body: e.target.parentNode.parentNode[1].value
    })
    setView("postpreview");
  }

  if(view === "createpost") {
    return (
      <div id="create-post">
        <form>
          <div className="form-group">
            <label htmlFor="post-title">Title</label>
            <input type="text" id="post-title"></input>
          </div>
          <div className="form-group">
            <label htmlFor="post-title">Body</label>
            <textarea id="post-body"></textarea>
          </div>
          <div className="button-group">
            <button onClick={previewHandler}>Preview Post</button>
            <button>Submit Post</button>
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