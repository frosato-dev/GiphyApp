import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import logo from '../assets/img/giphy.gif';

import Home from './Home';
import Favorites from './Favorites';
import NoMatch from './../components/404';
import NavBar from './NavBar';
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
          <NavBar />
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

