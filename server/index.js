const createApp = require('./app')
const logger = require('../lib/utils/logger')

module.exports = async function createServer (siteConfig, nuxtConfig, host, port, apiPrefix = '') {
  const app = await createApp(siteConfig, nuxtConfig, host, port, apiPrefix)

  return app.listen(port, host, () => {
    // Listen the server
    logger.debug('Server listening on http://' + host + ':' + port)
  })
}
