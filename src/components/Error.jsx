import React from 'react';
import { navigate } from '@reach/router';
import '../styles/Error.css';

const Error = () => {
  return (
    <div className="Error">
      <div id="error-icon">
        <i className="fas fa-bomb fa-4x" />
      </div>
      <div id="error-message">
        <h2 className="heading">Oops! Something went wrong!</h2>
        <p className="body">We couldn't find what you were looking for.</p>
        <button onClick={() => navigate('/')}>Go back!</button>
      </div>
    </div>
  );
};

export default Error;
