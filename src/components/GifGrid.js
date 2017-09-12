import React, { PureComponent } from 'react';
import GifItem from './GifItem';
import GifActions from './../containers/GifActions';
import './GifGrid.css';

export default class GifGrid extends PureComponent {

  renderLoading = () => (
    <section className="results">
      <div className="results__loading">
        <p>Please wait while loading</p>
        <div className="results__loader"></div>
      </div>
    </section>
  );

  renderEmpty = (emptyMessage) => (
    <div className="results__empty">
      {emptyMessage}
    </div>
  );

  render() {
    const {
      children,
      list ,
      listById,
      isLoading,
      emptyMessage,
    } = this.props;

    if(isLoading)
      return this.renderLoading();


    if(!list.length)
      return this.renderEmpty(emptyMessage);

    const items = list.map(id => (
      <GifItem
        key={id}
        gif={listById[id]}
      >
        <GifActions gif={listById[id]} />
      </GifItem>
    ));

    return (
      <section className="results">
        { children }
        <div className="results__grid grid">
          { items }
        </div>
      </section>
    );
  }
}
