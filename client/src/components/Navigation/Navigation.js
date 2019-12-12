import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';
import {IoMdArrowDropdown} from 'react-icons/io'

let Navigation = (props) => {
  const [priv, setPriv] = useState(0);

  let checkStatus = () => {
    if(props.user.loginStatus) {
      setPriv(props.user.role);
    }
  }

  useEffect(() => {
    console.log(props)
    checkStatus();
  },[props.user.loginStatus]);

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
      <div className="sub-nav">
        <p className="drophvr">Hello, Admin</p>
        <div className="dropdown-content">
        </div>
      </div>
      :
      (priv > 1) ?
      <div className="sub-nav">
        <p className="drophvr">Hello, Moderator</p>
        <div className="dropdown-content">
        </div>
      </div>
      :
      (priv > 0) ?
      <div className="sub-nav">
        <p className="drophvr">Hello, Member</p>
        <div className="dropdown-content">
        </div>
      </div>
      :
      <div className="sub-nav">
      <p className="drophvr">Hello, Guest <IoMdArrowDropdown/></p>
      <div className="dropdown-content">
        <p>Feel free to <Link to="/auth/login">login</Link> or <Link to="/auth/register">register</Link></p>
      </div>
    </div>
      }
    </div>
  )
}

export default Navigation;