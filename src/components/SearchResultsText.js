import React, { PureComponent } from 'react';
import './SearchResultsText.css';

export default class SearchResultsText extends PureComponent {

  render() {
    const {
      count,
      total,
      search,
    } = this.props;

    if(!count){
      return false;
    }

    return (
      <div className="search-result-text">
        Viewing
        <span className="search-result-text--accent"> {count} </span>
        on
        <span className="search-result-text--accent"> {total} </span>
        for search:
        <span className="search-result-text--accent"> {search} </span>
      </div>
    );
  }
}
