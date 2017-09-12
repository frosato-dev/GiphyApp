import React, { PureComponent } from 'react';

export default class LoadMore extends PureComponent {

  static defaultProps = {
    action: () => { console.log('action is not implemented'); }
  }

  render() {
    const { action, canLoadMore } = this.props;

    if(!canLoadMore)
      return false;

    return (
      <button className="results__more" onClick={action}>
        Load More
      </button>
    );
  }
}
