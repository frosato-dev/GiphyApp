import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form';
import Search from './../components/Search';
import { fetch as search } from './../actions/search';
import Grid from './../components/GifGrid';
import { FORM_NAME as SEARCH_FORM } from './../components/Search';

export const getUrlParam = (url, key) => new URL(url).searchParams.get(key);

class Home extends Component {

  componentWillMount() {
    const query = getUrlParam(window.location, 'q');
    if(query) {
      console.log(query);
      this.props.search(query)
    }
  }

  search = (values) => {
    this.props.search(values.query);
  };

  loadMore = () => {
    const { query, list } = this.props;
    this.props.search(query, list.length);
  }

  render() {
    const {
      list ,
      listById,
      total,
      count,
      query,
      isLoading,
    } = this.props;

    return (
      <div>
        <Search onSubmit={this.search} />
        <Grid
          list={list}
          listById={listById}
          emptyMessage={"Result list is empty"}
          total={total}
          count={count}
          search={query}
          isLoading={isLoading}
          onLoadMoreClick={this.loadMore}
        />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  search: search(dispatch),
}, dispatch);

const searchFormSelector = formValueSelector(SEARCH_FORM)

const mapStateToProps = state => ({
  listById: state.search.listById,
  list: state.search.list,
  count: state.search.list.length,
  total: state.search.pagination.total_count,
  query: searchFormSelector(state, 'query'),
  isLoading: false,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
