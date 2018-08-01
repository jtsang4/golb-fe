'use strict';
/**
 * Paths module.
 * It contains primary paths of project for building.
 * @module paths
 */

const path = require('path')
const fs = require('fs')
const url = require('url')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const envPublicURL = process.env.PUBLIC_URL

function ensureSlash(ensurePath, needsSlash) {
  const hasSlash = ensurePath.endsWith('/')
  if (needsSlash && !hasSlash) {
    return `${ensurePath}/`
  } else if (!needsSlash && hasSlash) {
    return ensurePath.substr(0, ensurePath.length - 1)
  } else {
    return ensurePath
  }
}

const getPublicURL = packageJSON => envPublicURL || require(packageJSON).homepage

const getServedPath = packageJSON => {
  const publicURL = getPublicURL(packageJSON)
  const servedURL = envPublicURL || (publicURL ? url.parse(publicURL).pathname : '/')
  return ensureSlash(servedURL, true)
}

module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHTML: resolveApp('public/index.html'),
  appIndexJS: resolveApp('src/index.tsx'),
  appPackageJSON: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.ts'),
  appNodeModules: resolveApp('node_modules'),
  appTSConfig: resolveApp('tsconfig.json'),
  appTSProdConfig: resolveApp('tsconfig.prod.json'),
  appTSLint: resolveApp('tslint.json'),
  publicURL: getPublicURL(resolveApp('package.json')),
  servedURL: getServedPath(resolveApp('package.json'))
}