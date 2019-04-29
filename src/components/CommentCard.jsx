import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import '../styles/CommentCard.css';
import { Voter } from './index';

const CommentCard = ({ comment, removeComment }) => {
  const { comment_id, votes, created_at, author, body } = comment;
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  return (
    <div className="CommentCard">
      <div className="comment-votes">
        <Voter votes={votes} section="comment" id={comment_id} />
      </div>
      <div className="comment-author-time subheading">
        By{' '}
        <Link className="author-link" to={`/users/${author}`}>
          {author}
        </Link>{' '}
        on {created_at}
      </div>
      {storedUser && storedUser.username === author ? (
        <button
          className="comment-delete-button"
          onClick={() => {
            removeComment(comment_id);
          }}
        >
          Delete
        </button>
      ) : null}
      <div className="comment-body body">{body}</div>
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
  removeComment: PropTypes.func.isRequired,
};

export default CommentCard;
