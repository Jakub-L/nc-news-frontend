import React, { Component } from 'react';
import * as api from '../utils/api';
import '../styles/Vote.css';

class Vote extends Component {
  state = {
    votes: 0,
    sentVotes: 0,
  };
  render() {
    const { votes, sentVotes } = this.state;
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (
      <div className="Vote">
        <button
          id="up-vote"
          disabled={sentVotes === 1 || !user}
          onClick={() => this.vote(1)}
        >
          ▲
        </button>
        <div id="votes">{votes + sentVotes}</div>
        <button
          id="down-vote"
          disabled={sentVotes === -1 || !user}
          onClick={() => this.vote(-1)}
        >
          ▼
        </button>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ votes: this.props.votes });
  }

  vote = inc_votes => {
    const { section, id } = this.props;
    this.setState(state => {
      return { sentVotes: state.sentVotes + inc_votes };
    });
    api.vote(inc_votes, id, section);
  };
}

export default Vote;
