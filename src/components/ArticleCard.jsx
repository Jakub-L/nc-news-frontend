import React from 'react';
import PropTypes from 'prop-types';
import { Vote } from './index';
import { Link } from '@reach/router';
import '../styles/ArticleSummary.css';

const ArticleSummary = ({ article, user }) => {
  return (
    <div className="ArticleSummary">
      <div className="article-votes">
        <Vote
          votes={article.votes}
          section="article"
          id={article.article_id}
          user={user}
        />
      </div>
      <Link
        to={`/articles/${article.article_id}`}
        className="article-title heading"
      >
        {article.title}
      </Link>
      <div className="article-author subheading">By {article.author}</div>
      <div className="article-time subheading">
        Posted on {article.created_at}
      </div>
    </div>
  );
};

ArticleSummary.propTypes = {
  article: PropTypes.shape({
    votes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleSummary;
