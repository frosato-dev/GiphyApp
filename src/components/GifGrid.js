import React, { PureComponent } from 'react';
import GifItem from './GifItem';
import './GifGrid.css';

export default class GifGrid extends PureComponent {

  renderLoading = () => (
    <section className="results">
      <div className="results__loading">
        <p>Please wait while loading</p>
        <div className="results__loader"></div>
      </div>
    </section>
  )

  renderEmpty = (emptyMessage) => (
    <div className="results__empty">
      {emptyMessage}
    </div>
  )

  render() {
    const {
      list ,
      listById,
      count,
      total,
      search,
      isLoading,
      emptyMessage,
      onLoadMoreClick
    } = this.props;


    const items = list.map(id => (
      <GifItem
        key={id}
        gif={listById[id]}
        isFavorite={true}
      />
    ));

    if(isLoading)
      return this.renderLoading();

    if(!list.length)
      return this.renderEmpty(emptyMessage);

    return (
      <section className="results">
        <div className="results__count">
          Viewing <span>{count}</span> on <span>{total}</span> for search: <span>{search}</span>
        </div>
        <div className="results__grid grid">
          {items}
        </div>
        { (isLoading || count === total) ? false :
          <button
            className="results__more"
            onClick={onLoadMoreClick}
          >
            Load More
          </button>
        }
      </section>
    );
  }
}
