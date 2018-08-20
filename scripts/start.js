const webpack = require('webpack')
const serve = require('webpack-serve')
const paths = require('../config/paths')
const webpackConfig = require('../config/webpack.dev.config')
const serveConfig = require('../config/serve.config')

const argv = {}
const config = Object.assign({}, serveConfig, {config: webpackConfig})

serve(argv, config).then(result => {
  const app = result.app
  app.listen(serveConfig.port)
})
