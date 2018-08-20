const paths = require('./paths')
const connectToKoa = require('koa-connect')
const historyFallback = require('connect-history-api-fallback')

module.exports = {
  // open: true,
  port: 2333,
  devMiddleware: {
    publicPath: paths.publicURL
  },
  add: app => {
    // Without this, accessing '/' or other not existing paths would get 404 when public path is set, because index.html is at public path now
    app.use(connectToKoa(historyFallback({
      index: paths.publicURL
    })))
  }
}