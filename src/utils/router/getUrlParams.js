/**
 * getUrlParams - Extract query parameters of a given URL
 *
 * @param  {String} url The url to search
 * @param  {Array} keys The keys to search
 * @return {Object} the result object with the given keys and
 * the encounted results as values
 */
export default (url, ...keys) => {
  var url = new URL(url);
  return keys.reduce((acc, curr) => {
    acc[curr] = url.searchParams.get(curr);
    return acc;
  },{});
}
