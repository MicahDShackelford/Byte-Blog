import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

let Navigation = (props) => {
  return (
    <div id="nav">
      <div id="navigation">
        <div className="nav-logo">
          <img src="../img/logo.png" style={{"maxWidth":"50px"}}></img>
          <h1>Byte Blog</h1>
        </div>
        <div className="nav-links">
          <Link to='/'>
            <div className="nav-item" id="nav-PostsView" onClick={props.handleClick}>
              <p>Home</p>
            </div>
          </Link>
        </div>
      </div>
      <div id="sub-nav">

      </div>
    </div>
  )
}

export default Navigation;