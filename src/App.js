import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import { Header, ArticleSingle, ArticleList, Nav, Auth } from './components';
import * as api from './utils/api';
import './styles/App.css';

class App extends Component {
  state = {
    topics: [],
    user: null,
    loginFailed: false,
  };

  render() {
    const { topics, user, loginFailed } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav topics={topics} user={user} logout={this.logout} />
        <Router className="MainContainer">
          <ArticleList path="/" user={user} />
          <ArticleList path="/topics/:topic" user={user} />
          <ArticleSingle path="/articles/:article_id" />
          <Auth path="/auth" login={this.login} loginFailed={loginFailed} />
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

  login = username => {
    api
      .getUserByUsername(username)
      .then(user => {
        this.setState({ user, loginFailed: false });
        navigate('/');
      })
      .catch(() => this.setState({ loginFailed: true }));
  };

  logout = () => {
    this.setState({ user: null, loginFailed: false });
    navigate('/');
  };
}

export default App;
