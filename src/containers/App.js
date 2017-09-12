import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom'

import logo from '../assets/img/giphy.gif';

import Home from './Home';
import Favorites from './Favorites';

export default class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header__title">
            Seek my Gif
          </h1>
          <img
            className="header__logo"
            alt="Powered by Giphy"
            src={logo}
          />
          <nav className="header__nav">
              <NavLink
                exact
                to="/"
                className="header__nav-item"
                activeClassName="header__nav-item--active"
              >
                Home
              </NavLink>
              <NavLink
                exact
                to="/favorites"
                className="header__nav-item"
                activeClassName="header__nav-item--active"
              >
                Favorites
              </NavLink>
          </nav>
        </header>
        <main>
          <Redirect from="*" to="/" />
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </main>
      </div>
    );
  }
}

