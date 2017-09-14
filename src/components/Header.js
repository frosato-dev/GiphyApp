import React, { PureComponent } from 'react';
import logo from '../assets/img/giphy.gif';
import './Header.css';

export default class Loading extends PureComponent {

  render() {
    const { children } = this.props;
    return (
      <header className="header">
        <h1 className="header__title">
          Seek my Gif
        </h1>
        <img
          className="header__logo"
          alt="Powered by Giphy"
          src={logo}
        />
        {children}
      </header>
    );
  }
}


