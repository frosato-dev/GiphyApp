import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetch as search } from './../actions/search';
import {
  add as addFavorite,
  remove as removeFavorite,
} from './../actions/favorite';

import SearchBar from './../components/Search';
import Grid from '../components/Grid';
import Gif from '../components/Gif';
import GifActions from './../components/Actions';
import ActionCopy from './../components/Actions/copy';
import ActionFavorite from './../components/Actions/favorite';
import LoadMore from './../components/LoadMore';
import SearchResultsText from './../components/SearchResultsText';
import Loading from './../components/Loading';

export const getUrlParam = (url, key) => new URL(url).searchParams.get(key);

class Home extends Component {

  componentWillMount() {
    const { query } = this.props;
    if(query && query.length) {
      this.props.search(query);
    }
  }

  search = (values) => {
    this.props.search(values.query);
  };

  loadMore = () => {
    const { query, list } = this.props;
    this.props.search(query, list.length);
  };

  toggleFavorite = (id) => () => {
    const favorite = this.props.favoritesById[id];
    if(favorite){
      this.props.removeFavorite(favorite);
    } else {
      const newGif = this.props.listById[id];
      this.props.addFavorite(newGif);
    }
  };

  render() {
    const {
      favoritesById,
      list ,
      listById,
      total,
      count,
      query,
      isLoading,
    } = this.props;

    return (
      <div>
        <SearchBar onSubmit={this.search} initialValues={{ query }}/>
        <section className="results">
          <SearchResultsText
            count={count}
            total={total}
            search={query}
          />
          <Loading isLoading={isLoading} />
          <Grid
            isEmpty={!list.length}
            emptyMessage={"No result"}
            isLoading={isLoading}
          >
            {
              list.map(id => (
                <Gif key={id} image={listById[id].images.downsized.url}>
                  <GifActions>
                    <ActionFavorite
                      isFavorite={!!favoritesById[id]}
                      action={this.toggleFavorite(id)}
                    />
                    <ActionCopy />
                  </GifActions>
                </Gif>
              ))
            }
            <LoadMore
              canLoadMore={(!isLoading && count < total)}
              action={this.loadMore}
            />
          </Grid>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  search: search(dispatch),
  addFavorite,
  removeFavorite,
}, dispatch);

const mapStateToProps = state => ({
  listById: state.search.listById,
  list: state.search.list,
  count: state.search.list.length,
  total: state.search.pagination.total_count,
  query: getUrlParam(window.location, 'q') || state.search.query,
  isLoading: state.search.isLoading,
  favoritesById: state.favorites.listById,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
