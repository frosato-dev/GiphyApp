const sharedConfig = require('./webpack.shared.config');
const mergeWith = require('lodash.mergewith');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');

// TODO Move
function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

module.exports = (env, argv) => {
  return mergeWith(sharedConfig(env, argv), {
    output: {
      filename: '[name].[chunkhash:8].js', // overide default [name].js
    },
    devtool: 'source-maps',
    plugins: [
      new uglifyJSPlugin({ sourceMap: true }),
    ]
  }, customizer);
}
