const path = require('path')
const defaultsDeep = require('lodash/defaultsDeep')

const defaultConfig = require('./default')
const validateConfig = require('./validate')
const { logger, fse, chalk, toml, yaml, slugify } = require('@statusfy/shared-utils')

function parseConfig (filePath) {
  const extension = path.extname(filePath)
  let data

  if (extension !== '.js') {
    const content = fse.readFileSync(filePath, 'utf-8')

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
  let configContent = {}

  // resolve configContent
  for (let configFile of configFiles) {
    const configPath = path.join(sourceDir, configFile)

    if (fse.existsSync(configPath)) {
      configContent = parseConfig(configPath)
      break
    }
  }

  const config = defaultsDeep(configContent, defaultConfig)
  config.sourceDir = sourceDir

  if (!config.name) {
    config.name = slugify(config.title)
  }

  // Run Validation
  try {
    const errors = validateConfig(config)

    if (errors && errors.length > 0) {
      logger.fatal('Your site configuration is invalid', errors.join('\n'))
      process.exit(1)
    }
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }

  return config
}
