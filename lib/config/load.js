const path = require('path')
const slugify = require('slugify')
const defaultsDeep = require('lodash/defaultsDeep')

const defaultConfig = require('./default')
const validateConfig = require('./validate')
const logger = require('../utils/logger')

module.exports = function loadConfig (sourceDir) {
  const userConfig = require(path.join(sourceDir, 'config.js'))

  const config = defaultsDeep(userConfig, defaultConfig)
  config.sourceDir = sourceDir

  if (!config.name) {
    config.name = slugify(userConfig.title, '_').toLowerCase()
  }

  // Run Validation
  try {
    const errors = validateConfig(config)

    if (errors.length > 0) {
      logger.fatal('Your site configuration is invalid', errors.join('\n'))
      process.exit(0)
    }
  } catch (error) {
    logger.error(error)
    process.exit(0)
  }

  return config
}
