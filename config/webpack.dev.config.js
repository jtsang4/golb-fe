'use strict';
process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

const path = require('path')
const paths = require('./paths')

module.exports = {
  mode: 'development',
  entry: {
    app: paths.appIndexJS,
  },
  output: {
    pathinfo: true,
    filename: 'index.js',
    path: paths.appDist,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["source-map-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { localIdentName: '[path][name]__[local]--[hash:base64:5]', importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true, plugins: [ require('postcss-cssnext')() ]} },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'url-loader', options: { limit: 10 * 1024 } },
        ],
      },
    ],
  },
}
