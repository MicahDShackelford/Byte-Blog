import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { IoMdArrowDropdown } from "react-icons/io";

let Navigation = props => {
  const [priv, setPriv] = useState(0);

  let updateRole = () => {
    setPriv(props.user.role);
  };

  useEffect(() => {
    updateRole();
  }, [props.sessionActive]);

  return (
    <div id="nav">
      <div id="navigation">
        <div className="nav-logo">
          <img src="../img/logo.png" style={{ maxWidth: "50px" }}></img>
          <h1>Byte Blog</h1>
        </div>
        <div className="nav-links">
          <Link to="/">
            <div
              className="nav-item"
              id="nav-PostsView"
              onClick={props.handleClick}
            >
              <p>HOME</p>
            </div>
          </Link>
          {props.user.role >= 2 && (
            <Link to="/create/">
              <div
                className="nav-item"
                id="nav-PostsView"
                onClick={props.handleClick}
              >
                <p>NEW POST</p>
              </div>
            </Link>
          )}
          <Link to="/">
            <div
              className="nav-item"
              id="nav-PostsView"
              onClick={props.handleClick}
            >
              <p>ABOUT</p>
            </div>
          </Link>
        </div>
      </div>
      {priv > 2 ? (
        <div className="sub-nav">
          <div className="dropdown">
            <p>
              Hello, Administrator <IoMdArrowDropdown />
            </p>
            <div className="dropdown-content">
              <a href="#" onClick={props.logout}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      ) : priv > 1 ? (
        <div className="sub-nav">
          <div className="dropdown">
            <p>
              Hello, Moderator <IoMdArrowDropdown />
            </p>
            <div className="dropdown-content">
              <a href="#" onClick={props.logout}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      ) : priv > 0 ? (
        <div className="sub-nav">
          <div className="dropdown">
            <p>
              Hello, Member <IoMdArrowDropdown />
            </p>
            <div className="dropdown-content">
              <a href="#" onClick={props.logout}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="sub-nav">
          <div className="dropdown">
            <p>
              Hello, Guest <IoMdArrowDropdown />
            </p>
            <div className="dropdown-content">
              <p>
                Feel free to <Link to="/auth/login">login</Link> or{" "}
                <Link to="/auth/register">register</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
