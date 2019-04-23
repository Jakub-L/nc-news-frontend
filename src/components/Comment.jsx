import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Comment.css';

const Comment = ({ comment }) => {
  const { votes, created_at, author, body } = comment;
  return (
    <div className="Comment">
      <div className="comment-votes">{votes}</div>
      <div className="comment-author">{author}</div>
      <div className="comment-time">{created_at}</div>
      <div className="comment-body">{body}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    votes: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
