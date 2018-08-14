const createApp = require('./app')
const logger = require('../lib/utils/logger')

module.exports = async function createServer (siteConfig, nuxtConfig, host, port, apiPrefix = '') {
  const app = await createApp(siteConfig, nuxtConfig, host, port, apiPrefix)

  // Listen the server
  logger.info('Server listening on http://' + host + ':' + port)
  return app.listen(port, host)
}
