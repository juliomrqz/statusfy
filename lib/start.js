const logger = require('./utils/logger')
const generateConfig = require('./config/generate')
const createApp = require('../server/app')

module.exports = async function start(sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  // Generate configuration
  const config = generateConfig(sourceDir, cliOptions)
  const host = config.statusfy.host
  const port = config.statusfy.port

  // Initialize the app server
  const app = await createApp(config, host, port)

  // Listen the server
  app.listen(port, host)
  logger.info('Server listening on http://' + host + ':' + port)
}
