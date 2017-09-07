/**
 * getUrlParams - Extract query parameters of a given URL
 *
 * @param  {String} url The url to search
 * @param  {Array} keys The keys to search
 * @return {Object} the result object with the given keys and
 * the encounted results as values
 */
export const getUrlParams = (url, ...keys) => {
  var url = new URL(url);
  return keys.reduce((acc, curr) => {
    acc[curr] = url.searchParams.get(curr);
    return acc;
  },{});
}

export const getUrlParam = (url, key) => new URL(url).searchParams.get(key);
export const getCurrentWindowUrlParam = (key) => getUrlParam(window.location, key);


export default (onHashChange) => {

  // Watch Changes
  window.onhashchange = () => onHashChange(window.location.hash);

  // Trigger initial
  onHashChange(window.location.hash);
}

/**
 * getRoute - Return the route for a given path
 *
 * @param  {String} path The url to search
 * @return {Object} the result object with the given keys and
 * the encounted results as values
 */
export const getRoute = (routes) => (path) => {
  return Object.keys(routes).reduce((acc,curr) => {
    const route = routes[curr];
    if(route.path === path) {
      acc = route;
    }
    return acc;
  }, routes['home']);
}
