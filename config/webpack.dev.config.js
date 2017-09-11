const webpack = require('webpack')
const mergeWith = require('lodash.mergewith');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const Paths = require('./paths');
const sharedConfig = require('./webpack.shared.config');

// TODO Move
function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

module.exports = (env, argv) => {
  return mergeWith(sharedConfig(env, argv), {
    watch: true,
    devtool: 'eval',
    devServer: {
      overlay: true, // Pour afficher les erreurs sur la page
      contentBase: Paths.BUILD, // boolean | string | array, static file location
      compress: true, // enable gzip compression
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      https: false, // true for self-signed, object for cert authority
      //noInfo: true, // only errors & warns on hot reload
      headers: { // CORS
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    plugins: [
      new DashboardPlugin({ port: 8080 }),
    ],
  }, customizer);
};
