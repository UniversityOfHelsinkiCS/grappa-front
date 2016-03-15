const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'production';
const API_URL = process.env.API_URL || 'http://localhost:3000';

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        API_URL: JSON.stringify(API_URL),
      },
    }),
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.jsx', '.js'],
  },
};
