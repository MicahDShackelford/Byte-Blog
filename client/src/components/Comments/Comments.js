import React, {useState} from 'react';
import fetchUser from '../../util/dataFetch/fetchUser';
import moment from 'moment';
import './Comments.css';

let Comments = ({comments}) => {
  return (
    <div id="comments-section">
      <h1>Comments</h1>
      {comments.map((comment) => {
        let [avatar, setAvatar] = useState("");
        fetchUser(comment.author)
          .then((res) => {
            setAvatar(res.avatar);
          })
        return(
          <div className="comment">
            <div className="comment-head">
              <img src={avatar}></img>
            </div>
            <div className="comment-body">
              <div className="comment-body-head">
                <h3>{comment.author.toUpperCase()}</h3>
                <h3>•</h3>
                <h5>{moment(comment.postedAt).fromNow()}</h5>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        )
      })}
      <div id="post-comment">
        <form>
          <div className="form-group">
            <textarea id="comment-textarea" onClick={() => {document.getElementById('comment-textarea').style.height = "3.5em"}} placeholder="Leave a Comment"></textarea>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Comments;