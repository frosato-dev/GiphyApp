import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Search from './../components/Search';
import { fetch as search } from './../actions/search';
import Grid from './../components/GifGrid';

class Home extends Component {

  search = (values) => {
    this.props.search(values.query);
  }

  render() {
    const { list , listById } = this.props;
    return (
      <div>
        <Search onSubmit={this.search} />
        <Grid
          list={list}
          listById={listById}
          emptyMessage={"The list is empty"}
        />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  search,
}, dispatch);

const mapStateToProps = state => ({
  listById: state.search.listById,
  list: state.search.list,
  count: 10,
  total: 1000,
  search: 'query',
  isLoading: false,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
