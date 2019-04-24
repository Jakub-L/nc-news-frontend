import React, { Component } from 'react';
import { CommentCard, Voter, CommentSubmit } from './index';
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
            <Voter votes={votes} section="article" id={article_id} />
          </div>
          <div className="article-title">{title}</div>
          <div className="article-author-time">
            By {author} on {created_at}
          </div>
          <div className="article-body">{body}</div>
        </div>
        <h2>Comments:</h2>
        {user ? <CommentSubmit addComment={this.addComment} /> : null}
        {comments.map(comment => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              removeComment={this.removeComment}
            />
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
      comments = comments.map(comment => {
        return {
          ...comment,
          created_at: data.convertArticleDate(comment.created_at),
        };
      });
      this.setState({ comments });
    });
  };

  addComment = body => {
    const { article_id } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));
    api.postComment(article_id, user.username, body).then(() => {
      this.fetchComments();
    });
  };

  removeComment = comment_id => {
    api.deleteComment(comment_id).then(() => this.fetchComments());
  };
}

export default ArticleSingle;
