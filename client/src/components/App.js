import React from 'react';
import Navigation from './Navigation';
import PostsView from './PostsView';
import './styles/App.css';

import fakeData from '../../fakedata';
import PostView from './PostView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      view: 'PostsView',
      posts: [{title: null, author: null, postedTime: null,post: null}],
      currentPost: null
    });
    this.handleClick = this.handleClick.bind(this);
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
    if(this.state.view === 'PostsView') {
      return(
        <div id="app">
          <Navigation handleClick={this.handleClick}/>
          <PostsView posts={this.state.posts} handleClick={this.handleClick}/>
        </div>
      )
    }else if(this.state.view === 'PostView') {
      return <div id="app">
        <Navigation handleClick={this.handleClick}/>
        <PostView post={this.state.currentPost} />
      </div>
    }
  }
}

export default App;