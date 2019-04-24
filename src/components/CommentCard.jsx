import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Comment.css';
import Vote from './Voter';

const Comment = ({ comment, removeComment }) => {
  const { comment_id, votes, created_at, author, body } = comment;
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  return (
    <div className="Comment">
      <div className="comment-votes">
        <Vote votes={votes} section="comment" id={comment_id} />
      </div>
      <div className="comment-author">{author}</div>
      <div className="comment-time">{created_at}</div>
      {storedUser.username === author ? (
        <button
          className="comment-delete"
          onClick={() => {
            removeComment(comment_id);
          }}
        >
          Delete
        </button>
      ) : null}
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
