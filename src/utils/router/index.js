import Dom from './../../utils/dom';
import { NAV} from './../../constants/dom-selector';
import getNavItem from './../../templates/get-nav-item';

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

/**
 * getRoute - Return the route for a given path
 *
 * @param  {String} path The url to search
 * @return {Object} the result object with the given keys and
 * the encounted results as values
 */
export const getRoute = (routes) => (path) => {
  const defaultKey = Object.keys(routes)[0];
  return Object.keys(routes).reduce((acc,curr) => {
    const route = routes[curr];
    if(route.path === path) {
      acc = route;
    }
    return acc;
  }, routes[defaultKey]);
}

/**
 * onHashChange - /!\ is getting messy because of Dom action
 *
 * @param  {String} path the value of the hash
 * @param  {Object} routes an object containing route objects
 * @return {void}
 */
const onHashChange = (requestedPath, routes) => {
  const nextRoute = getRoute(routes)(requestedPath);

  let navItems = '';

  // UnMount Old view(s) and Render current
  Object.values(routes).map(r => {
    if(r.path !== nextRoute.path) {
      r.controller.unMount();

      // forge navigation
      navItems += getNavItem(r);
    }

    Dom.get(NAV)[0].innerHTML = navItems; // render nav
  });

  nextRoute.controller.render();

  document.title = nextRoute.title;

  return nextRoute;
}

/**
 * watchHashChange
 *
 * @param  {Object} routes an object containing route objects
 * @return {void}
 */
export default (routes, callback) => {

  // Watch Changes
  window.onhashchange = () => {
    const nextRoute = onHashChange(window.location.hash, routes);
    callback(nextRoute);
  };

  // Trigger initial
  const nextRoute = onHashChange(window.location.hash, routes);
  callback(nextRoute)
}
