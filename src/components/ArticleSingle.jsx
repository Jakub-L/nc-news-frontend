import React, { Component } from 'react';
import { Comment, Vote, CommentSubmit } from './index';
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
      article: { article_id, author, title, body, created_at, votes },
    } = this.state;
    const user = JSON.parse(sessionStorage.getItem('user'));
    return loading ? (
      <p className="loading">Loading. . .</p>
    ) : (
      <div className="ArticleSingle">
        <div className="article">
          <div className="article-votes">
            <Vote votes={votes} section="article" id={article_id} />
          </div>
          <div className="article-title">{title}</div>
          <div className="article-author-time">
            By {author} on {created_at}
          </div>
          <div className="article-body">{body}</div>
        </div>
        <h2>Comments:</h2>
          {user ? <CommentSubmit /> : null}
        {comments.map(comment => {
          return (
            <Comment key={comment.comment_id} comment={comment} user={user} />
          );
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
