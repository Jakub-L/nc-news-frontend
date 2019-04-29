import React, { Component } from 'react';
import { ArticleList } from '.';
import * as api from '../utils/api';
import '../styles/UserPage.css';

class UserPage extends Component {
  state = {
    user: {},
  };

  render() {
    const {
      user: { avatar_url, name },
    } = this.state;
    const { username } = this.props;
    return (
      <div className="UserPage">
        <img id="user-avatar" src={avatar_url} alt="User Avatar" />
        <div id="user-username" className="heading">
          {username}
        </div>
        <div id="user-name" className="subheading">
          {name}
        </div>
        <div id="user-articles">
          <h2 className="heading">Articles by {username}:</h2>
          <ArticleList username={username} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    const { username } = this.props;
    api.getUserByUsername(username).then(user => {
      this.setState({ user });
    });
  };
}

export default UserPage;
