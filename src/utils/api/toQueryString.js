/**
 * ToQueryString - Serialize and encode an object into a valide URI format
 *
 * @param  {Object} object the params to encode
 * @return {String} the param's encoded string
 */
export default (object) => Object
  .keys(object)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
  .join('&')
