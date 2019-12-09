import React from 'react';
import './styles/CreatePost.css';


let CreatePost = () => {
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
          <button>Preview Post</button>
          <button>Submit Post</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost;