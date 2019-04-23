import React, { Component } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import { Router } from '@reach/router';
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
