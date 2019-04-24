import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import '../styles/Nav.css';

const Nav = ({ topics, user, logout }) => {
  return (
    <nav className="Nav">
      <Link to="/">Home</Link>
      <div className="dropdown">
        <div className="dropdown-button">Topics</div>
        <div className="dropdown-content">
          {topics.map(topic => (
            <Link
              key={topic.slug}
              to={`/topics/${topic.slug}`}
              className="dropdown-link"
            >
              {topic.slug}
            </Link>
          ))}
        </div>
      </div>
      {user ? (
        <button onClick={logout}>
          Logout<br />
          <span>({user.username})</span>
        </button>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </nav>
  );
};

Nav.propTypes = {
  topics: PropTypes.array.isRequired,
};

export default Nav;
