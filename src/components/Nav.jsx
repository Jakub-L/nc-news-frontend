import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import * as api from '../utils/api';
import '../styles/Nav.css';

class Nav extends Component {
  state = {
    topics: [],
  };
  render() {
    const { topics } = this.state;
    const { logout } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));
    let origin = { path: window.location.pathname };
    return (
      <nav className="Nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <div className="dropdown-container nav-link">
          <div className="nav-link">Topics</div>
          <div className="dropdown-list">
            {topics.map(topic => (
              <Link
                key={topic.slug}
                to={`/topics/${topic.slug}`}
                className="dropdown-list-link nav-link"
              >
                {topic.slug}
              </Link>
            ))}
          </div>
        </div>
        {user ? (
          <button onClick={logout} className="nav-link nav-logout-container">
            <span className="nav-logout">Logout</span>
            <span className="nav-logout-subheading">({user.username})</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="nav-link"
            onClick={() => (origin.path = window.location.pathname)}
            state={origin}
            data-cy="login-link"
          >
            Login
          </Link>
        )}
      </nav>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(({ response }) => {
        navigate(`/error/${response.status}`, { replace: true });
      });
  };
}

Nav.propTypes = {
  topics: PropTypes.array.isRequired,
};

export default Nav;
