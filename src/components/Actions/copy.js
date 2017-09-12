import React, { PureComponent } from 'react'

export default class ActionCopy extends PureComponent {

  render() {
    const { url } = this.props;
    return (
      <button
        alt="Copy to clipboard"
        data-clipboard-text={url}
        className="grid__panel-action-btn icon-btn icon-btn__copy"
      />
    );
  };
}
