import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './Login.css';

let Login = (props) => {
  let [loginStatus, setLoginStatus] = useState(false)
  let loginSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const loginAttempt = {
      status: 'attempt',
      username: username,
      password: password,
      dt: new Date()
    }
    fetch('/auth/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'POST',
      body: JSON.stringify(loginAttempt)
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if(res.ok === true) {
        props.setLogin(res.user);
        localStorage.setItem("activeUser", JSON.stringify(res));
        setLoginStatus(true);
      }
    })
  }
  if(!loginStatus) {
    return(
      <div id="login">
        <form id="login-form" onSubmit={loginSubmit}>
          <div className="login-header">
            <img src="../img/logo.png"></img>
            <h1>Byte Blog</h1>
            <h2>Please Login to continue!</h2>
          </div>
          <div className="login-form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter a username" autoComplete="username"/>
          </div>
          <div className="login-form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter a password" autoComplete="current-password"/>
          </div>
          <button>Login</button>
        </form>
      </div>
    )
  }else {
    return <Redirect to="/"/>
  }
}

export default Login;