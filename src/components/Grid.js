import React, { PureComponent } from 'react';

export default class Grid extends PureComponent {

  renderEmpty = (emptyMessage) => (
    <div className="results__empty">
      {emptyMessage}
    </div>
  );

  render() {
    const {
      children,
      isLoading,
      isEmpty,
      emptyMessage,
    } = this.props;

    if(isLoading)
      return false;

    if(isEmpty)
      return this.renderEmpty(emptyMessage);

    return (
      <div className="results__grid grid">
        { children }
      </div>
    );
  }
}
