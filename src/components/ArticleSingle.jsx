import React, { Component } from 'react';
import { Comment } from './index';
import * as api from '../utils/api';
import * as data from '../utils/data';
import '../styles/ArticleSingle.css';

class ArticleSingle extends Component {
  state = {
    loading: true,
    article: {},
    comments: [],
  };

  render() {
    const {
      comments,
      loading,
      article: { author, title, body, created_at, votes },
    } = this.state;
    return loading ? (
      <p>Loading...</p>
    ) : (
      <div className="ArticleSingle">
        <div className="article">
          <div className="article-votes">{votes}</div>
          <div className="article-title">{title}</div>
          <div className="article-author-time">
            By {author} on {created_at}
          </div>
          <div className="article-body">{body}</div>
        </div>
        <h2>Comments:</h2>
        {comments.map(comment => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api.getArticleByID(article_id).then(article => {
      article = {
        ...article,
        created_at: data.convertArticleDate(article.created_at),
      };
      this.setState({ article, loading: false });
    });
  };

  fetchComments = () => {
    const { article_id } = this.props;
    api.getCommentsByArticle(article_id).then(comments => {
      this.setState({ comments });
    });
  };
}

export default ArticleSingle;
