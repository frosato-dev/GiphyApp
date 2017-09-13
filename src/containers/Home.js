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
import SearchResultsText from './../components/SearchResultsText';
import Loader from '../components/Loader';
import AffixHOC from '../components/Affix';

const AffixSearchResultText = AffixHOC(SearchResultsText);

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
    const { isLoading, query, list } = this.props;
    if(!isLoading) {
      setTimeout(() => this.props.search(query, list.length), 1500);
    }
  }

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

    /*

     */
    return (
      <div>
        <SearchBar onSubmit={this.search} initialValues={{ query }}/>
        <section className="results">
          <AffixSearchResultText
            viewportOffsetTop={0}
            container={this}
            affixClassName={"search-result-text--affix"}
            count={count}
            total={total}
            search={query}
          />
          <Grid
            isEmpty={!list.length && query}
            emptyMessage={"No result"}
            loadMore={this.loadMore}
            hasMore={(!isLoading && count < total)}
            loader={<Loader />}
            isLoading={isLoading}
          >
            {
              list.map((id, index) => (
                <Gif key={`${id}_${index}`} image={listById[id].images.downsized}>
                  <GifActions>
                    <ActionFavorite
                      isFavorite={!!favoritesById[id]}
                      action={this.toggleFavorite(id)}
                    />
                    <ActionCopy text={listById[id].bitly_url}/>
                  </GifActions>
                </Gif>
              ))
            }
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
  query: state.search.query,
  isLoading: state.search.isLoading,
  favoritesById: state.favorites.listById,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
