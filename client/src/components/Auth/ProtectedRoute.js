import React, { useState, useEffect } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";

const ProtectedRoute = ({
  path,
  loginChecked,
  checkLogin,
  sessionActive,
  requiredRole,
  component,
  ...props
}) => {
  const Component = component;
  let [verify, setVerify] = useState("undefined");

  <Route path={path} exact />;

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (token) {
      fetch("/auth/tokenVerification", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.ok) {
            if (res.user.role >= requiredRole) {
              setVerify("verified");
            }
          } else {
            setVerify("forbidden");
          }
        });
    } else {
      setVerify("forbidden");
    }
  }, []);

  if (verify === "verified") {
    //Of required role & logged in
    return <CreatePost {...props} />;
  } else if (verify === "forbidden") {
    // Not logged in
    return <Redirect to="/auth/login" />;
  } else {
    return (
      <div>
        <h1>Forbidden</h1>
        <p>
          Applogoies, you do not have the propper access for required for this
          path. Redirecting you to the homepage
        </p>
        <Link to="/">Return home</Link>
      </div>
    );
  }
};
export default ProtectedRoute;
