import React from 'react';
import { navigate } from '@reach/router';
import '../styles/Error.css';

const Error = ({ uri }) => {
  const messages = {
    '/error/400': 'Something went wrong when making your request.',
    '/error/404': "We couldn't find what you were looking for.",
    '/error/405': 'Your browser tried to use a method we do not support.',
    '/error/422': 'Your request could not be processed.',
    '/error/500': "There's an error with our server! We're working on it.",
  };
  return (
    <div className="Error">
      <div id="error-icon">
        <i className="fas fa-bomb fa-4x" />
      </div>
      <div id="error-message">
        <h2 className="heading">Oops! Something went wrong!</h2>
        <p className="body">
          {messages[uri]
            ? messages[uri]
            : "We couldn't find what you were looking for."}
        </p>
        <button onClick={() => navigate('/')}>Get me Home!</button>
      </div>
    </div>
  );
};

export default Error;
