import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { ArticleCard, ArticleSort, PageScroller } from './index';
import * as data from '../utils/data';
import * as api from '../utils/api';
import '../styles/ArticleList.css';

class ArticleList extends Component {
  state = {
    loading: true,
    articles: [],
    sortBy: 'created_at',
    sortOrder: 'desc',
    currentPage: 1,
    lastPage: null,
  };

  render() {
    const { articles, loading, sortOrder, currentPage, lastPage } = this.state;
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
        <PageScroller
          currentPage={currentPage}
          lastPage={lastPage}
          updatePage={this.updatePage}
        />
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
      prevState.currentPage !== this.state.currentPage ||
      prevState.sortOrder !== this.state.sortOrder
    ) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { topic } = this.props;
    const { sortBy, sortOrder, currentPage } = this.state;
    this.setState({ loading: true });
    api
      .getArticles(topic, sortBy, sortOrder, currentPage)
      .then(([articles, total_count]) => {
        const lastPage = Math.ceil(total_count / 10);
        articles = articles.map(article => {
          return {
            ...article,
            created_at: data.convertArticleDate(article.created_at),
          };
        });
        this.setState({
          articles,
          loading: false,
          lastPage,
        });
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

  updatePage = newPage => {
    this.setState({ currentPage: Number(newPage) });
  };
}

ArticleList.propTypes = {
  topic: PropTypes.string,
};

export default ArticleList;
