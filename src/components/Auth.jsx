import React, { Component } from 'react';
import '../styles/Auth.css';

class Auth extends Component {
  state = {
    username: '',
  };
  render() {
    const { username } = this.state;
    return (
      <form className="Auth" onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={this.handleChange}
        />
        <button type="submit">Log in!</button>
      </form>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.username.value);
  };
}

export default Auth;
