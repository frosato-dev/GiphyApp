const path = require('path');
const Paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = (env) => new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: env === 'development'
})

module.exports = (env, argv) => {
  console.log(env);
  return {
    //context: __dirname,
    target: 'web',
    entry: path.join(Paths.APP, 'index.js'),
    output: {
      // options related to how webpack emits results

      path: Paths.BUILD,
      // the target directory for all output files
      // must be an absolute path (use the Node.js path module)

      filename: '[name].js', // string
      // the filename template for entry chunks

      publicPath: '/', // string
      // the url to the output directory resolved relative to the HTML page

    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: Paths.NODE_MODULES,
          use: [ 'babel-loader' ],
        },
        {
          test: /\.css$/,
          use: extractSass().extract({
              use: [
                { loader: 'css-loader' },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: (loader) => [
                      require('postcss-import')({ root: loader.resourcePath }),
                      require('postcss-cssnext')(),
                      require('cssnano')(),
                      //require('autoprefixer')(), // not needed ? since it's included in 'postcss-cssnext'
                    ],
                  },
                },
                //{ loader: 'sass-loader' }, // To remove use postCSS instead
              ],
              fallback: 'style-loader' // Use style-loader in development
          })
        },
        /*
        {
			    test: /\.svg/,
			    use: {
			      loader: 'svg-url-loader',
			      options: {}
			    }
			  },
        */
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'url-loader?limit=10000',
            'img-loader'
          ]
        }
      ],
    },
    plugins: [
      new ExtractTextPlugin('styles.css'), // CSS will be extrated into this file in the build directory
      new HtmlWebpackPlugin({ // Generate the HTML index
        filename: 'index.html',
        template: path.join(Paths.APP, 'templates', 'index.html'),
        title: process.env.npm_package_name,
      }),
    ],
  };
}
