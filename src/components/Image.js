import React, { Component } from 'react';
import Loader from './Loader';
import './Image.css';

const STATUS = {
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
}

export default class Image extends Component {

  constructor(props) {
    super(props);
    this.state = { imageStatus: STATUS.LOADING };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.url !== this.props.url ||
      nextState.imageStatus !== this.state.imageStatus
    );
  }

  handleImageLoaded() {
    this.setState({ imageStatus: STATUS.LOADED });
  }

  handleImageError() {
    this.setState({ imageStatus: STATUS.FAILED });
  }

  render() {
    const { src, className, style, alt} = this.props;
    const _className = `${className} image`;
    return (
      <div className={_className} style={style}>
        { (this.state.imageStatus === STATUS.LOADING) ? (
            <div className={'image__loader'}>
              <Loader />
            </div>
          ) : false
        }
        <img
          className={'image__img'}
          alt={alt}
          src={src}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageError.bind(this)}
        />
      </div>
    );
  }
}
