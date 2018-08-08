const path = require('path')
const chalk = require('chalk')
const slugify = require('slugify')
const defaultsDeep = require('lodash/defaultsDeep')
const isURL = require('validator/lib/isURL')
const url = require('url')

const defaultConfig = require('./default')
const logger = require('../utils/logger')

const validFrontMatterFormats = ['yaml', 'yml', 'toml', 'json']

module.exports = function loadConfig (sourceDir) {
  const userConfig = require(path.join(sourceDir, 'config.js'))

  const config = defaultsDeep(userConfig, defaultConfig)

  if (!config.name) {
    config.name = slugify(userConfig.title, '_').toLowerCase()
  }

  // Run validators
  // Check Front Matter Format
  const frontMatterFormat = config.contentConfig.frontMatterFormat
  if (frontMatterFormat) {
    if (!validFrontMatterFormats.includes(frontMatterFormat)) {
      logger.fatal(`The default Front Matter Format is invalid. These are the valid formats: ${chalk.cyan(validFrontMatterFormats.join(', '))}.`)
      process.exit(0)
    }
  }

  // Check base url
  if (config.baseUrl && config.baseUrl !== '/') {
    const validBaseUrl = isURL(config.baseUrl, {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: true,
      require_host: true,
      require_valid_protocol: true
    })

    let isValid = validBaseUrl

    if (isValid) {
      isValid = url.parse(config.baseUrl).pathname === '/'
    }

    if (!isValid) {
      logger.fatal(`The Base URL is invalid. Example: ${chalk.cyan('https://status.yourbaseurl.com')}.`)
      process.exit(0)
    }

    // Make sure a trailing slash (at the end of the URL) is not defined
    config.baseUrl = config.baseUrl.replace(/\/$/, '')
  }

  return config
}
