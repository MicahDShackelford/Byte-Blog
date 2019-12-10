import React from 'react';
import './Login.css';

let Login = (props) => {
  return(
    <div id="login">
      <form id="login-form">
        <h1>Simple Blog</h1>
        <h2>Please Login to continue!</h2>
        <div className="form-group">
          <label>Username</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="text" />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login;