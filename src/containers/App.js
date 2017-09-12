import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom'

import logo from '../assets/img/giphy.gif';

import Home from './Home';
import Favorites from './Favorites';
import NoMatch from './../components/404';

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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
            <Route component={NoMatch}/>
          </Switch>
        </main>
      </div>
    );
  }
}

