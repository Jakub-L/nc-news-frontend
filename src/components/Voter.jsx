import React, { Component } from 'react';
import { navigate } from '@reach/router';
import * as api from '../utils/api';
import '../styles/Voter.css';

class Voter extends Component {
  state = {
    votes: 0,
    sentVotes: 0,
  };
  render() {
    const { votes, sentVotes } = this.state;
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (
      <div className="Voter">
        <button
          className="vote-button"
          id="up-vote"
          title={user ? 'Vote up' : 'Log in to vote'}
          disabled={sentVotes === 1 || !user}
          onClick={() => this.vote(1)}
        >
          ▲
        </button>
        <div className="heading" id="votes">
          {votes + sentVotes}
        </div>
        <button
          className="vote-button"
          id="down-vote"
          title={user ? 'Vote down' : 'Log in to vote'}
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

export default Voter;
