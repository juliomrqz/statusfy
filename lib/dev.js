const createServer = require('../server')
const generateConfig = require('./config/generate')

module.exports = async function dev (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'development'

  // Generate configuration
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions)
  nuxtConfig.mode = cliOptions.ssr ? 'universal' : 'spa'

  const host = nuxtConfig.statusfy.host
  const port = nuxtConfig.statusfy.port

  // Initialize the server
  await createServer(siteConfig, nuxtConfig, host, port)
}
