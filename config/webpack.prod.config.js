'use strict';
process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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
    filename: 'assets/index-[hash:6].js',
    chunkFilename: 'assets/[name].[chunkhash:6].js',
    path: paths.appDist,
    publicPath: paths.publicURL,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true, localIdentName: '[hash:base64:7]', importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true, plugins: [ require('precss'), require('postcss-cssnext')() ]} },
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
    new CleanWebpackPlugin([paths.appDist], { root: path.resolve(__dirname, '../') }),
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCSSExtractPlugin({
      filename: "assets/[name].css",
      chunkFilename: "assets/[id].css",
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
