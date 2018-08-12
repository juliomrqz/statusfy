const createServer = require('../server')
const generateConfig = require('./config/generate')

module.exports = async function dev (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'development'

  // Generate configuration
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions)
  nuxtConfig.mode = cliOptions.ssr ? 'universal' : 'spa'

  // Initialize the server
  await createServer(
    siteConfig,
    nuxtConfig,
    nuxtConfig.server.host,
    nuxtConfig.server.port)
}
