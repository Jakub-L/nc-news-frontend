import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import {
  Header,
  ArticleSingle,
  ArticleList,
  Nav,
  Auth,
  Error,
} from './components';
import * as api from './utils/api';
import './styles/App.css';

class App extends Component {
  state = {
    topics: [],
    loginFailed: false,
  };

  render() {
    const { topics, loginFailed } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav topics={topics} logout={this.logout} />
        <Router className="main-container">
          <ArticleList path="/" />
          <ArticleList path="/topics/:topic" />
          <ArticleSingle path="/articles/:article_id" />
          <Auth path="/login" login={this.login} loginFailed={loginFailed} />
          <Error default />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api.getTopics().then(topics => {
      this.setState({ topics });
    });
  };

  login = (username, path) => {
    api
      .getUserByUsername(username)
      .then(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.setState({ loginFailed: false });
        navigate(path);
      })
      .catch(() => this.setState({ loginFailed: true }));
  };

  logout = () => {
    sessionStorage.removeItem('user');
    this.setState({ loginFailed: false });
  };
}

export default App;
