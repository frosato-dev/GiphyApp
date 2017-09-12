import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from './../components/GifGrid';

class Favorites extends Component {

  render() {
    const {
      list ,
      listById,
    } = this.props;

    return (
      <div>
        <Grid
          list={list}
          listById={listById}
          emptyMessage={"Favorite list is empty"}
          isLoading={false}

        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({
  listById: state.favorites.listById,
  list: state.favorites.list,
  isLoading: false,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
