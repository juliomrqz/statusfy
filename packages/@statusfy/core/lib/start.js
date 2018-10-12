const generateConfig = require('./config/generate')
const createServer = require('../server')

module.exports = async function start (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  // Generate configuration
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions)

  // Initialize the server
  await createServer(
    siteConfig,
    nuxtConfig,
    nuxtConfig.server.host,
    nuxtConfig.server.port)
}
