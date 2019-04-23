import React, { Component } from 'react';
import { Router } from '@reach/router';
import './styles/App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import * as api from './utils/api';

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
        <Router className="ArticleContainer">
          <ArticleList path="/" />
          <ArticleList path="/topics/:topic" />
          <Article path="/articles/:article_id" />
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
