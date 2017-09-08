import getGridItem from './get-grid-item';

/**
 * getGridItems - return the HTML for a given array of items returned by API
 *
 * @return {String} the HTML String
 */
export default (data, favorites) => data.reduce((acc, curr) => {
  const isFavorite = !!favorites[curr.id];
  acc += getGridItem(curr, isFavorite);
  return acc;
}, '')
