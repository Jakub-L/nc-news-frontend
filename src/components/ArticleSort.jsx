import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ArticleSort.css';

const ArticleSort = ({ updateSortCategory, updateSortOrder, sortOrder }) => {
  return (
    <div className="ArticleSort">
      <label htmlFor="sort-property">Sort by: </label>
      <select
        className="sort-dropdown"
        name="sort-property"
        onChange={event => updateSortCategory(event.target.value)}
      >
        <option value="created_at">Date created</option>
        <option value="comment_count">Comment count</option>
        <option value="votes">Votes</option>
      </select>
      <button
        className="sort-button"
        onClick={updateSortOrder}
        title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
      >
        {sortOrder === 'asc' ? '▲' : '▼'}
      </button>
    </div>
  );
};

ArticleSort.propTypes = {
  updateSortCategory: PropTypes.func.isRequired,
  updateSortOrder: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default ArticleSort;
