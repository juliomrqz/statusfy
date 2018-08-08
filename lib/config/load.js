const path = require('path')
const slugify = require('slugify')
const defaultsDeep = require('lodash/defaultsDeep')

const defaultConfig = require('./default')

module.exports = function loadConfig (sourceDir) {
  const userConfig = require(path.join(sourceDir, 'config.js'))

  const config = defaultsDeep(userConfig, defaultConfig)

  if (!config.name) {
    config.name = slugify(userConfig.title, '_').toLowerCase()
  }

  console.log(config)

  return config
}
