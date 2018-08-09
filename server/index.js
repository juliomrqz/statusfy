const createApp = require('./app')
const logger = require('../lib/utils/logger')

module.exports = async function createServer (siteConfig, nuxtConfig, host, port) {
  const app = await createApp(siteConfig, nuxtConfig, host, port)

  // Listen the server
  app.listen(port, host)
  logger.info('Server listening on http://' + host + ':' + port)
}
