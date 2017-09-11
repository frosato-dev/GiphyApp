import React, { PureComponent } from 'react';
import GifItem from './GifItem';
import './GifGrid.css';

export default class GifGrid extends PureComponent {

  renderLoading = () => (
    <section className="results">
      <div className="results__loading results__loading--hidden">
        <p>Please wait while loading</p>
        <div className="results__loader"></div>
      </div>
    </section>
  )

  renderEmpty = () => (
    <div className="results__empty results__empty--hidden">
      No results...
    </div>
  )

  render() {
    const {
      list ,
      listById,
      count,
      total,
      search,
      isLoadding,
    } = this.props;


    const items = list.map(id => (
      <GifItem
        key={id}
        gif={listById[id]}
        isFavorite={true}
      />
    ));

    if(isLoadding)
      return this.renderLoading();

    if(!list.length)
      return this.renderEmpty();

    return (
      <section className="results">
        <div className="results__count results__count--hidden">
          Viewing <span>{count}</span> {items.length} on <span>{total}</span> for search: <span>{search}</span>
        </div>
        <div className="results__grid grid">
          {items}
        </div>
        <button className="results__more results__more--hidden">
          Load More
        </button>
      </section>
    );
  }
}
