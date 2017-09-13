import React, { PureComponent } from 'react';
import Masonry from 'react-masonry-infinite';
import Loader from './Loader';
import './Grid.css';

const size = [
  { columns: 1, gutter: 20 },
  { mq: '768px', columns: 2, gutter: 20 },
  { mq: '1024px', columns: 3, gutter: 20 }
];

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

    console.log(isLoading, isEmpty);


    if(isLoading && isEmpty)
      return this.renderLoading();

    if(isEmpty)
      return this.renderEmpty(emptyMessage);

    return (
      <Masonry
        className="grid"
        hasMore={hasMore}
        loadMore={loadMore}
        size={size}
        loader={loader}
        threshold={200}
      >
        {children}
      </Masonry>
    );
  }
}
