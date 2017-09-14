

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Home extends Component {

  render() {
    const { query } = this.props;

    const searchPath = query ? `/?q=${query}` : '/';

    return (
      <nav className="header__nav">
        <NavLink
          exact
          to={searchPath}
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
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({
  query: state.search.query,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
