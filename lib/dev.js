const logger = require('./utils/logger')

module.exports = async function build (sourceDir, cliOptions = {}) {
  logger.info('sourceDir', sourceDir)
  logger.info('cliOptions', JSON.stringify(cliOptions))
}
