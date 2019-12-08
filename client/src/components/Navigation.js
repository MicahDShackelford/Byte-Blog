import React from 'react';
import './styles/Navigation.css';

let Navigation = (props) => {
  return (
    <div id="navigation">
      <div className="nav-logo">
        <h1>Simple Blog</h1>
      </div>
      <div className="nav-links">
        <div className="nav-item">
          <p>Home</p>
        </div>
        <div className="nav-item">
          <p>Not Home</p>
        </div>
      </div>
    </div>
  )
}

export default Navigation;