import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PageScroller.css';

const PageScroller = ({ currentPage, lastPage, updatePage }) => {
  return (
    <div className="PageScroller">
      {currentPage >= 4 && (
        <button onClick={e => updatePage(e.target.id)} id="1">
          1
        </button>
      )}
      {currentPage >= 5 && <div className="page-ellipsis">...</div>}
      {currentPage - 2 > 0 && (
        <button onClick={e => updatePage(e.target.id)} id={currentPage - 2}>
          {currentPage - 2}
        </button>
      )}
      {currentPage - 1 > 0 && (
        <button onClick={e => updatePage(e.target.id)} id={currentPage - 1}>
          {currentPage - 1}
        </button>
      )}
      <div id="current-page">{currentPage}</div>
      {currentPage + 1 <= lastPage && (
        <button onClick={e => updatePage(e.target.id)} id={currentPage + 1}>
          {currentPage + 1}
        </button>
      )}
      {currentPage + 2 <= lastPage && (
        <button onClick={e => updatePage(e.target.id)} id={currentPage + 2}>
          {currentPage + 2}
        </button>
      )}
      {currentPage + 3 < lastPage && <div className="page-ellipsis">...</div>}
      {currentPage + 2 < lastPage && (
        <button onClick={e => updatePage(e.target.id)} id={lastPage}>
          {lastPage}
        </button>
      )}
    </div>
  );
};

PageScroller.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number,
  updatePage: PropTypes.func.isRequired,
};

export default PageScroller;
