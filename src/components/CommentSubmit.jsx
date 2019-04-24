import React, { Component } from 'react';
import '../styles/CommentSubmit.css';

class CommentSubmit extends Component {
  state = {
    comment: '',
  };

  render() {
    const { comment } = this.state;
    return (
      <form className="CommentSubmit" onSubmit={this.handleSubmit}>
        <textarea
          maxLength="5000"
          rows="10"
          id="comment"
          value={comment}
          onChange={this.handleChange}
        />
        <button type="submit">Add Comment</button>
      </form>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = event.target.comment;
    this.props.addComment(value);
    this.setState({ comment: '' });
  };
}

export default CommentSubmit;
