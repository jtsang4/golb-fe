'use strict';

const paths = require('./paths')

module.exports = {
  mode: 'development',
  entry: [
    require('./polyfills'),
    paths.appIndexJS,
  ],
  output: {
    pathinfo: true,
    filename: 'index.js',
    path: paths.appDist,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { localIdentName: '[path][name]__[local]--[hash:base64:5]', importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true, plugins: [ require('postcss-cssnext')() ]} }
        ]
      },

    ]
  }
}
