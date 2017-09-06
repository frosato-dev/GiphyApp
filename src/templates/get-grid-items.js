import getGridItem from './get-grid-item';

/**
 * getGridItems - return the HTML for a given array of items returned by API
 *
 * @return {String} the HTML String
 */
export default (data) => data.reduce((acc, curr) => {
  acc += getGridItem(curr);
  return acc;
}, '')
