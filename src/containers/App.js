import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

// import logo from '../assets/img/logo.svg';
import './App.css';

import Home from './Home'
import Favorites from './Favorites'


export default class App extends Component {
  render() {
    return (
        <div>
            <header>
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </header>

            <main>
                <Route exact path="/" component={Home} />
                <Route exact path="/favorites" component={Favorites} />
            </main>
        </div>
    );
  }
}

