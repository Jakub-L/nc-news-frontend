import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Header, ArticleSingle, ArticleList, Nav, Auth } from './components';
import * as api from './utils/api';
import './styles/App.css';

class App extends Component {
  state = {
    topics: [],
  };

  render() {
    const { topics } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav topics={topics} />
        <Router className="MainContainer">
          <ArticleList path="/" />
          <ArticleList path="/topics/:topic" />
          <ArticleSingle path="/articles/:article_id" />
          <Auth path="/auth" />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api.getTopics().then(newTopics => {
      this.setState({ topics: newTopics });
    });
  };
}

export default App;
