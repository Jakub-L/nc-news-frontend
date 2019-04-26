import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Auth.css';

class Auth extends Component {
  state = {
    defaultUsername: 'tickle122',
    username: '',
  };
  render() {
    const { username } = this.state;
    const { loginFailed } = this.props;
    return (
      <form className="Auth" onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          className={loginFailed ? 'login-fail' : null}
          id="username"
          value={username}
          spellCheck="false"
          onChange={this.handleChange}
          onFocus={this.clearUsernameIfDefault}
          onBlur={this.setDefaultIfEmpty}
        />
        {loginFailed ? <p id="login-fail-warning">Login failed!</p> : null}
        <button type="submit">Log in!</button>
      </form>
    );
  }

  componentDidMount() {
    const { defaultUsername } = this.state;
    const { logout } = this.props;
    logout();
    this.setState({ username: defaultUsername });
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      location: { state },
    } = this.props;
    const path = state ? state.path : '/';
    const { username } = event.target;
    this.props.login(username.value, path);
  };

  setDefaultIfEmpty = () => {
    const { username, defaultUsername } = this.state;
    if (!username)
      this.setState({
        username: defaultUsername,
      });
  };

  clearUsernameIfDefault = () => {
    const { username, defaultUsername } = this.state;
    if (username === defaultUsername)
      this.setState({
        username: '',
      });
  };
}

Auth.propTypes = {
  loginFailed: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Auth;
