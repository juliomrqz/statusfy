const path = require('path')
const fs = require('fs-extra')
const slugify = require('slugify')
const chalk = require('chalk')
const defaultsDeep = require('lodash/defaultsDeep')
const yaml = require('js-yaml')
const toml = require('toml')

const defaultConfig = require('./default')
const validateConfig = require('./validate')
const logger = require('../utils/logger')

function parseConfig (filePath) {
  const extension = path.extname(filePath)
  let data

  if (extension !== '.js') {
    const content = fs.readFileSync(filePath, 'utf-8')

    switch (extension) {
    case '.yml':
      logger.debug(`Reading configuration from ${chalk.yellow('config.yml')}`)

      data = yaml.safeLoad(content)
      break

    case '.toml':
      logger.debug(`Reading configuration from ${chalk.yellow('config.toml')}`)

      data = toml.parse(content)
      break
    }
  } else {
    logger.debug(`Reading configuration from ${chalk.yellow('config.js')}`)

    data = require(filePath)
  }

  return data || {}
}

module.exports = function loadConfig (sourceDir) {
  const configFiles = ['config.yml', 'config.toml', 'config.js']

  // resolve userConfig
  let userConfig = {}

  for (let configFile of configFiles) {
    const configPath = path.join(sourceDir, configFile)

    if (fs.existsSync(configPath)) {
      userConfig = parseConfig(configPath)
      break
    }
  }

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
