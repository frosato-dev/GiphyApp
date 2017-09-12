import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

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
                    <Link
                        to="/"
                        className="header__nav-item"
                    >
                        Home
                    </Link>
                    <Link
                        to="/favorites"
                        className="header__nav-item"
                    >
                        Favorites
                    </Link>
                </nav>
            </header>
            <main>
                <Route exact path="/" component={Home} />
                <Route exact path="/favorites" component={Favorites} />
            </main>
        </div>
    );
  }
}

