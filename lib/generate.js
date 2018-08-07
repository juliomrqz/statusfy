const logger = require('./utils/logger')

module.exports = async function build (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  logger.info('sourceDir', sourceDir)
  logger.info('cliOptions', JSON.stringify(cliOptions))
}
