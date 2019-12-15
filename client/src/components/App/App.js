import React from "react";
import Navigation from "../Navigation/Navigation";
import PostsView from "../PostsView/PostsView";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../Auth/ProtectedRoute";

import fakeData from "../../../fakedata";
import PostView from "../PostView/PostView";
import CreatePost from "../CreatePost/CreatePost";
import Login from "../Auth/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "CreatePost",
      posts: [
        {
          title: null,
          author: null,
          postedTime: null,
          post: null,
          comments: null
        }
      ],
      currentPost: null,
      sessionActive: false,
      loginChecked: false,
      activeUser: {
        username: null,
        role: 0 // 0 - Guest, 1 - Member, 2- Moderator, 3 - Admin
      }
    };
    this.fetchPosts = this.fetchPosts.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }
  componentDidMount() {
    this.checkLogin();
    this.fetchPosts();
  }

  setLogin(user) {
    this.setState({
      sessionActive: true,
      activeUser: user
    });
  }
  logout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    this.setState({
      sessionActive: false,
      activeUser: {
        username: null,
        role: 0
      }
    });
    window.location.href = "/";
  }

  checkLogin() {
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
            this.setLogin(res.user);
          } else {
            console.log("Token error");
          }
        });
    }
    this.setState({
      loginChecked: true
    });
  }
  fetchPosts() {
    fetch("/posts/retrieve")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          posts: res.reverse()
        });
      });
  }

  render() {
    return (
      <Router>
        <div id="app">
          <Navigation
            user={this.state.activeUser}
            sessionActive={this.state.sessionActive}
            logout={this.logout}
          />
          <Switch>
            <Route path="/" exact>
              <PostsView posts={this.state.posts} />
            </Route>
            <Route
              path="/post/:postId"
              exact
              render={props => (
                <PostView
                  fetchPosts={this.fetchPosts}
                  posts={this.state.posts}
                  {...props}
                />
              )}
            />
            <Route
              path="/post/:postId"
              exact
              render={props => (
                <PostView
                  fetchPosts={this.fetchPosts}
                  posts={this.state.posts}
                  {...props}
                />
              )}
            />
            <Route path="/auth/login">
              <Login setLogin={this.setLogin} />
            </Route>
            <ProtectedRoute
              path="/create"
              loginChecked={this.state.loginChecked}
              checkLogin={this.checkLogin}
              sessionActive={this.state.sessionActive}
              requiredRole="2"
              component={CreatePost}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
