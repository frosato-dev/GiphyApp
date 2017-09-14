import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from './../components/Grid';
import GidItem from './../components/GidItem';
import Image from './../components/Image';
import Actions from './../components/Actions';
import ActionCopy from './../components/Actions/copy';
import ActionFavorite from './../components/Actions/favorite';
import { remove as removeFavorite } from './../actions/favorite';

class Favorites extends Component {

  removeFavorite = (id) => () => {
    const favorite = this.props.listById[id];
    this.props.removeFavorite(favorite);
  };

  render() {
    const {
      list ,
      listById,
    } = this.props;

    return (
      <div>
        <section className="results">
          <Grid
            isEmpty={!list.length}
            emptyMessage={"No gif added to your favorite yet"}
            isLoading={false}
            loadMore={() => {}}
            hasMore={false}
          >
            {list.map(id => (
              <GidItem key={id}>
                <Image
                  src={listById[id].images.downsized.url}
                  className="grid__panel-image"
                  alt={'decorative'}
                />
                <Actions>
                  <ActionFavorite
                    isFavorite={true}
                    action={this.removeFavorite(id)}
                  />
                  <ActionCopy text={listById[id].bitly_url}/>
                </Actions>
              </GidItem>
            ))}
          </Grid>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeFavorite,
}, dispatch);

const mapStateToProps = state => ({
  listById: state.favorites.listById,
  list: state.favorites.list,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
