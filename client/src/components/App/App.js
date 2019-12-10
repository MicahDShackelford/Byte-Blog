import React from 'react';
import Navigation from '../Navigation/Navigation';
import PostsView from '../PostsView/PostsView';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import fakeData from '../../../fakedata';
import PostView from '../PostView/PostView';
import CreatePost from '../CreatePost/CreatePost';
import Login from '../../Auth/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      view: 'CreatePost',
      posts: [{title: null, author: null, postedTime: null,post: null}],
      currentPost: null
    });
    this.handleClick = this.handleClick.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    fetch('http://127.0.0.1:3000/posts/retrieve')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          posts: res.reverse()
        })
      })
  }

  handleClick(e) {
    e.preventDefault();
    let target = e.target.id.split('-');
    if(target[0] === 'viewpost') {
      this.setState({
        view: 'PostView',
        currentPost: this.state.posts[target[1]]
      })
    }else if(target[0] === 'nav') {
      this.setState({
        view: target[1]
      })
    }
  }

  render() {
    return(
      <Router>
        <div id="app">
          <Navigation />
            <Switch>
              <Route path="/" exact>
                <PostsView posts={this.state.posts}/>
              </Route>
              <Route path="/post/create">
                <CreatePost />
              </Route>
              <Route path="/post/:postId" render={(props) => <PostView fetchPosts={this.fetchPosts} posts={this.state.posts} {...props} />}/>
              <Route path="/auth/login" component={Login}/>
            </Switch>
        </div>
      </Router>
    )
  }

  // render() {
  //   if (this.state.view === 'PostsView') {
  //     return(
  //       <div id="app">
  //         <Navigation handleClick={this.handleClick}/>
  //         <PostsView posts={this.state.posts} handleClick={this.handleClick}/>
  //       </div>
  //     )
  //   } else if(this.state.view === 'PostView') {
  //     return <div id="app">
  //       <Navigation handleClick={this.handleClick}/>
  //       <PostView post={this.state.currentPost} />
  //     </div>
  //   } else if(this.state.view === 'CreatePost') {
  //     return <div id="app">
  //       <Navigation handleClick={this.handleClick}/>
  //       <CreatePost />
  //     </div>
  //   }
  // }
}

export default App;