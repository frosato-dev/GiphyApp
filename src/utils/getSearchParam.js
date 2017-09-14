export default (search, key) => {
  const result = search.match(
    new RegExp("(\\?|&)" + key + "(\\[\\])?=([^&]*)")
  );
  return result ? result[3] : false;
};
