import React from 'react';
import Navigation from './Navigation';
import PostsView from './PostsView';
import './styles/App.css';

import fakeData from '../../fakedata';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      view: 'PostsView',
      posts: [{title: null, author: null, postedTime: {date: null, time: null},post: null}]
    });
  }

  componentDidMount() {
    this.setState({
      posts: fakeData
    });
  }

  render() {
    if(this.state.view === 'PostsView') {
      return(
        <div id="app">
          <Navigation />
          <PostsView posts={this.state.posts}/>
        </div>
      )
    }
  }
}

export default App;