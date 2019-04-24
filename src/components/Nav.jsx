import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import '../styles/Nav.css';

const Nav = ({ topics, logout }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
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
        <button onClick={logout} className="nav-link">
          Logout
          <br />
          <span className="nav-link-subheading">({user.username})</span>
        </button>
      ) : (
        <Link to="/auth" className="nav-link">
          Login
        </Link>
      )}
    </nav>
  );
};

Nav.propTypes = {
  topics: PropTypes.array.isRequired,
};

export default Nav;
