import React, { Component } from 'react';
import '../styles/CommentSubmit.css';

class CommentSubmit extends Component {
  state = {
    comment: '',
    submitFail: false,
  };

  render() {
    const { comment, submitFail } = this.state;
    return (
      <form className="CommentSubmit" onSubmit={this.handleSubmit}>
        <textarea
          maxLength="5000"
          rows="10"
          id="comment"
          className={submitFail ? 'submit-fail' : null}
          placeholder={submitFail ? 'You cannot submit empty comments' : null}
          value={comment}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        <button type="submit">Add Comment</button>
      </form>
    );
  }

  handleFocus = () => {
    this.setState({ submitFail: false });
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value, submitFail: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = event.target.comment;
    if (value.length) {
      this.props.addComment(value);
      this.setState({ comment: '' });
    } else {
      this.setState({ submitFail: true });
    }
  };
}

export default CommentSubmit;
