import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './Loader';
import './Grid.css';

export default class Grid extends PureComponent {

  renderEmpty = (emptyMessage) => (
    <div className="grid__empty">
      {emptyMessage}
    </div>
  );

  renderLoading = () => (
    <div className="grid__loading">
      <Loader />
    </div>
  );

  render() {
    const {
      children,
      isEmpty,
      isLoading,
      emptyMessage,
      loadMore,
      hasMore,
      loader,
    } = this.props;

    if(isLoading && isEmpty)
      return this.renderLoading();

    if(isEmpty)
      return this.renderEmpty(emptyMessage);

    return (
      <InfiniteScroll
        hasMore={hasMore}
        loadMore={loadMore}
        loader={loader}
        threshold={0}
      >
        <div className="grid">
          {children}
        </div>
      </InfiniteScroll>
    );
  }
}
