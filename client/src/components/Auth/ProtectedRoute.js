import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';

const ProtectedRoute = ({path, activeUser, component, ...props}) => {
  const Component = component;
  let [verify, setVerify] = useState("a");
  <Route path={path} exact/>
  if(!activeUser.loginStatus && !localStorage.getItem("activeUser")) {
    return (
      <Redirect to="/auth/login"/>
    )
  }else {
    let user = JSON.parse(localStorage.getItem("activeUser"));
    fetch('/auth/tokenVerification', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if(res.status === 200) {
        console.log("Verified");
        setVerify(true);
      }else {
        console.log("Not Verified");
        setVerify(false);
      }
    })
  }
  if(!verify) {
    return (
      <Redirect to="/auth/login"/>
    )
  }else if(verify){
    return (
      <CreatePost/>
    )
  }else {
    return (
      <span></span>
    )

  }
}
export default ProtectedRoute;