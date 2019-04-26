import React, { Component } from 'react';
import { ArticleCard, ArticleSort } from './index';
import * as data from '../utils/data';
import * as api from '../utils/api';
import '../styles/ArticleList.css';
import { navigate } from '@reach/router';

class ArticleList extends Component {
  state = {
    loading: true,
    articles: [],
    sortBy: 'created_at',
    sortOrder: 'desc',
  };

  render() {
    const { articles, loading, sortOrder } = this.state;
    return (
      <div className="ArticleList">
        <h2 className="heading" id="topic-heading">
          NCNews/{this.props.topic || 'all'}
        </h2>
        <ArticleSort
          updateSortCategory={this.updateSortCategory}
          updateSortOrder={this.updateSortOrder}
          sortOrder={sortOrder}
        />
        {loading ? (
          <p className="loading">Loading . . .</p>
        ) : (
          articles.map(article => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        )}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.sortOrder !== this.state.sortOrder
    ) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { topic } = this.props;
    const { sortBy, sortOrder } = this.state;
    this.setState({ loading: true });
    api
      .getArticles(topic, sortBy, sortOrder)
      .then(articles => {
        articles = articles.map(article => {
          return {
            ...article,
            created_at: data.convertArticleDate(article.created_at),
          };
        });
        this.setState({ articles, loading: false });
      })
      .catch(({ response }) => {
        navigate(`/error/${response.status}`, { replace: true });
      });
  };

  updateSortCategory = sortCategory => {
    this.setState({ sortBy: sortCategory });
  };

  updateSortOrder = () => {
    this.setState(state => {
      return { sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' };
    });
  };
}

export default ArticleList;
