import React, { PureComponent } from 'react';
import Image from './Image';
import './Gif.css';

const WIDTH = 296;
const ACTIONS_HEIGHT = 40;

export default class Gif extends PureComponent {

  getHeight = (image) => {
    const ratio = image.height / image.width;
    return WIDTH * ratio;
  }

  render() {
    const { image, children } = this.props;
    const imageHeight = this.getHeight(image);
    const wrapperStyle = {
      height: imageHeight + ACTIONS_HEIGHT + 'px',
      width: WIDTH
    };

    const imageStyle = {
      height: imageHeight,
      width: WIDTH,
    };

    return (
      <div className="grid__panel" style={wrapperStyle}>
        <div className="grid__panel-content">
          <Image
            src={image.url}
            className="grid__panel-image"
            alt={'decorative'}
            style={imageStyle}
          />
        </div>
        { children }
      </div>
    );
  }
}


