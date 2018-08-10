'use strict';
process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const paths = require('./paths')

module.exports = {
  mode: 'production',

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
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { localIdentName: '[hash:base64:7]', importLoaders: 1 } },
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

  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCSSExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new UglifyJSWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
}
