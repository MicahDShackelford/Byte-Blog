import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

let Navigation = (props) => {
  return (
    <div id="navigation">
      <div className="nav-logo">
        <h1>Simple Blog</h1>
      </div>
      <div className="nav-links">
        <Link to='/'>
          <div className="nav-item" id="nav-PostsView" onClick={props.handleClick}>
            <p>Home</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navigation;