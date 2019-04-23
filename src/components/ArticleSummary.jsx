import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import '../styles/ArticleSummary.css';

const ArticleSummary = ({ article }) => {
  return (
    <div className="ArticleSummary">
      <div className="article-votes">{article.votes}</div>
      <Link to={`/articles/${article.article_id}`} className="article-title">
        {article.title}
      </Link>
      <div className="article-author">By {article.author}</div>
      <div className="article-time">Posted on {article.created_at}</div>
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
