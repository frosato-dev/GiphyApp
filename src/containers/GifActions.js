import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { add, remove } from './../actions/favorite';

class GridActions extends PureComponent {

  toggleFavorite = () => {
    const { id, isFavorite } = this.props;
    console.log('in', isFavorite)
    if(isFavorite){
      console.log('remove', id)
      return remove(id);
    }
    return add(id);
  };

  render() {
    const { url, isFavorite, favoriteText } = this.props;
    let favoriteClass = 'grid__panel-action-btn icon-btn icon-btn__favorite'
    favoriteClass += isFavorite ? ' icon-btn__favorite--active' : '';

    return (
      <div className="grid__panel-action">
        <button
          onClick={this.toggleFavorite}
          alt={favoriteText}
          className={favoriteClass}
        />
        <button
          alt="Copy to clipboard"
          data-clipboard-text={url}
          className="grid__panel-action-btn icon-btn icon-btn__copy"
        />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  remove: remove(dispatch),
  add: add(dispatch),
}, dispatch);


const mapStateToProps = (state, props) => {
  const { id, url } = props.gif;
  const isFavorite = !!state.favorites.listById[id];
  return ({
    favoriteText: isFavorite ? 'Remove from favorites' : 'Add to favorites',
    isFavorite,
    url,
    id,
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridActions);
