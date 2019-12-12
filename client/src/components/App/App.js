import React from 'react';
import Navigation from '../Navigation/Navigation';
import PostsView from '../PostsView/PostsView';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../Auth/ProtectedRoute';

import fakeData from '../../../fakedata';
import PostView from '../PostView/PostView';
import CreatePost from '../CreatePost/CreatePost';
import Login from '../Auth/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      view: 'CreatePost',
      posts: [{title: null, author: null, postedTime: null,post: null}],
      currentPost: null,
      activeUser: {
        loginStatus: false,
        name: null,
        username: null,
        role: 0 // 0 - Guest, 1 - Member, 2- Moderator, 3 - Admin
      }
    });
    this.fetchPosts = this.fetchPosts.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }
  componentDidMount() {
    this.checkLogin();
    this.fetchPosts();
  }

  setLogin(user) {
    this.setState({
      activeUser: user
    })
  }

  checkLogin() {
    let user = JSON.parse(localStorage.getItem("activeUser"));
    if(user) {
      fetch('/auth/tokenVerification', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        if(res.status === 200) {
          this.setState({
            activeUser: user.user
          })
        }
      }).then(() => {
        console.log(this.state.activeUser)
      })
  }
}

  fetchPosts() {
    fetch('/posts/retrieve')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          posts: res.reverse()
        })
      })
  }

  render() {
    return(
      <Router>
        <div id="app">
          <Navigation user={this.state.activeUser} />
            <Switch>
              <Route path="/" exact>
                <PostsView posts={this.state.posts}/>
              </Route>
              {/* <Route path="/post/create">
                <CreatePost />
              </Route> */}
              <Route path="/post/:postId" exact render={(props) =>
              <PostView fetchPosts={this.fetchPosts} posts={this.state.posts} {...props} />}/>

              <Route path="/auth/login">
                <Login setLogin={this.setLogin}/>
              </Route>

              <ProtectedRoute path="/create" activeUser={this.state.activeUser} component={CreatePost}/>
            </Switch>
        </div>
      </Router>
    )
  }
}

export default App;