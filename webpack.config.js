require("dotenv").config();
const path = require("path");
const webpack = require("webpack");

const API_URL = process.env.API_URL;

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: [
    "webpack-hot-middleware/client",
    "./src/index",
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify(API_URL),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    modulesDirectories: ["node_modules"],
    extensions: ["", ".jsx", ".js"],
  },
};
