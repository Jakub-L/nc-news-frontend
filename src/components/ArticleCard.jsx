import React from 'react';
import PropTypes from 'prop-types';
import { Voter } from './index';
import { Link } from '@reach/router';
import '../styles/ArticleCard.css';

const ArticleCard = ({ article, user }) => {
  return (
    <div className="ArticleCard">
      <div className="article-votes">
        <Voter
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

ArticleCard.propTypes = {
  article: PropTypes.shape({
    votes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleCard;
