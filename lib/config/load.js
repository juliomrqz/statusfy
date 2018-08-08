const path = require('path')
const chalk = require('chalk')
const slugify = require('slugify')
const defaultsDeep = require('lodash/defaultsDeep')

const defaultConfig = require('./default')
const logger = require('../utils/logger')

const validFrontMatterFormats = ['yaml', 'yml', 'toml', 'json']

module.exports = function loadConfig (sourceDir) {
  const userConfig = require(path.join(sourceDir, 'config.js'))

  const config = defaultsDeep(userConfig, defaultConfig)

  if (!config.name) {
    config.name = slugify(userConfig.title, '_').toLowerCase()
  }

  // Check Front Matter Format
  const frontMatterFormat = config.contentConfig.frontMatterFormat
  if (frontMatterFormat) {
    if (!validFrontMatterFormats.includes(frontMatterFormat)) {
      logger.fatal(`The default Front Matter Format is invalid. These are the valid formats: ${chalk.cyan(validFrontMatterFormats.join(', '))}.`)

      process.exit(0)
    }
  }

  return config
}
