import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from './Home';
import Favorites from './Favorites';
import NoMatch from './../components/404';
import Header from './../components/Header';
import NavBar from './NavBar';
export default class App extends Component {

  render() {
    return (
      <div>
        <Header>
          <NavBar />
        </Header>
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

