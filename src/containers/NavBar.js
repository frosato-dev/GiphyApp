import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { HOME, FAVORITES } from "../constants/routes";

class NavBar extends Component {

  isCurrentLocation = (path) => () => {
    const { pathname } = this.props;
    return (pathname === path);
  };

  getHomePath() {
    const { query } = this.props;
    return query ? `${HOME}?q=${query}` : HOME;
  };

  render() {

    return (
      <nav className="header__nav">
        <NavLink
          exact
          to={this.getHomePath()}
          className="header__nav-item"
          activeClassName="header__nav-item--active"
          isActive={this.isCurrentLocation(HOME)}
        >
          Home
        </NavLink>
        <NavLink
          exact
          to={FAVORITES}
          className="header__nav-item"
          activeClassName="header__nav-item--active"
        >
          Favorites
        </NavLink>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({
  query: state.search.query,
  pathname: state.routing.location.pathname,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
