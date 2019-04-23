import React, { Component } from 'react';
import '../styles/ArticleSingle.css';
import Comment from './Comment';

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
}

export default ArticleSingle;
