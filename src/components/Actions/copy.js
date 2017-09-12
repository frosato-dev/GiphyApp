import React, { PureComponent } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

export default class ActionCopy extends PureComponent {

  state = {
    copied: false,
  };

  onCopy = () => {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1000);
    })
  };

  render() {
    const { text } = this.props;
    let classes = `grid__panel-action-btn icon-btn icon-btn__copy`;
    classes += this.state.copied ? ' icon-btn__copy--active': '';
    return (
      <CopyToClipboard
        text={text}
        onCopy={this.onCopy}>
        <button
          alt="Copy to clipboard"
          className={classes}
        />
      </CopyToClipboard>
    );
  };
}
