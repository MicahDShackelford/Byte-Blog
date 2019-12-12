import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';
import {IoMdArrowDropdown} from 'react-icons/io'

let Navigation = (props) => {
  const [priv, setPriv] = useState(0);

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
      {(priv > 2) ?
      <div class="sub-nav">
        <p class="drophvr">Hello, Admin</p>
        <div class="dropdown-content">
        </div>
      </div>
      :
      (priv > 1) ?
      <div class="sub-nav">
        <p class="drophvr">Hello, Moderator</p>
        <div class="dropdown-content">
        </div>
      </div>
      :
      (priv > 0) ?
      <div class="sub-nav">
        <p class="drophvr">Hello, Member</p>
        <div class="dropdown-content">
        </div>
      </div>
      :
      <div class="sub-nav">
      <p class="drophvr">Hello, Guest <IoMdArrowDropdown/></p>
      <div class="dropdown-content">
        <p>Feel free to <Link to="/auth/login">login</Link> or <Link to="/auth/register">register</Link></p>
      </div>
    </div>
      }
    </div>
  )
}

export default Navigation;