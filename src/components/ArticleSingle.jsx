import React, { Component } from 'react';
import { navigate, Link } from '@reach/router';
import { CommentCard, Voter, CommentSubmit, PageScroller } from './index';
import * as api from '../utils/api';
import * as data from '../utils/data';
import '../styles/ArticleSingle.css';

class ArticleSingle extends Component {
  state = {
    loading: true,
    article: {},
    comments: [],
    currentPage: 1,
    lastPage: null,
  };

  render() {
    const {
      comments,
      loading,
      currentPage,
      lastPage,
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
          <div className="article-title heading">{title}</div>
          <div className="article-author-time subheading">
            By{' '}
            <Link className="author-link" to={`/users/${author}`}>
              {author}
            </Link>{' '}
            on {created_at}
          </div>
          <div className="article-body body">{body}</div>
        </div>
        <h2 className="heading" id="comments-section-header">
          Comments:
        </h2>
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
        <PageScroller
          currentPage={currentPage}
          lastPage={lastPage}
          updatePage={this.updatePage}
        />
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchComments();
    }
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api
      .getArticleByID(article_id)
      .then(article => {
        const lastPage = Math.ceil(Number(article.comment_count) / 10);
        article = {
          ...article,
          created_at: data.convertArticleDate(article.created_at),
        };
        this.setState({ article, loading: false, lastPage });
      })
      .catch(({ response }) => {
        navigate(`/error/${response.status}`, { replace: true });
      });
  };

  fetchComments = () => {
    const { article_id } = this.props;
    const { currentPage } = this.state;
    api
      .getCommentsByArticle(article_id, currentPage)
      .then(comments => {
        comments = comments.map(comment => {
          return {
            ...comment,
            created_at: data.convertArticleDate(comment.created_at),
          };
        });
        this.setState({ comments });
      })
      .catch(({ response }) => {
        navigate(`/error/${response.status}`, { replace: true });
      });
  };

  addComment = body => {
    const { article_id } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));
    api
      .postComment(article_id, user.username, body)
      .then(comment => {
        this.setState(state => {
          return { comments: [comment, ...state.comments] };
        });
      })
      .catch(({ response }) => {
        navigate(`/error/${response.status}`, { replace: true });
      });
  };

  removeComment = comment_id => {
    this.setState(state => {
      return {
        comments: state.comments.filter(
          comment => comment.comment_id !== comment_id
        ),
      };
    });
    api
      .deleteComment(comment_id)
      .then(() => this.fetchComments())
      .catch(({ response }) => {
        navigate(`/error/${response.status}`, { replace: true });
      });
  };

  updatePage = newPage => {
    this.setState({ currentPage: Number(newPage) });
  };
}

export default ArticleSingle;
