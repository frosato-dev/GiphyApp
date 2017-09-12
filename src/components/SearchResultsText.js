import React, { PureComponent } from 'react';

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
      <div className="results__count">
        Viewing <span>{count}</span> on <span>{total}</span> for search: <span>{search}</span>
      </div>
    );
  }
}
