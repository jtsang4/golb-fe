'use strict';
/**
 * Env module is a utility to load and set env variables
 * @module env
 */


const fs = require('fs')
const paths = require('./paths')

delete require.cache[require.resolve('./paths')]

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.')
}

const dotFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  NODE_ENV !== 'test' && `${paths.dotenv}`,
  paths.dotenv,
].filter(Boolean)

dotFiles.forEach(envFile => {
  if (fs.existsSync(envFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: envFile
      })
    )
  }
})

function getClientEnvironment(publicURL) {
  const raw = {
    NODE_ENV,
    PUBLIC_URL: publicURL,
  }
  const stringified = Object.keys(raw).reduce(
    (env, key) => {
      env.key = JSON.stringify(raw[key])
      return env
    },
    {}
  )
  return { raw, stringified }
}

module.exports = getClientEnvironment