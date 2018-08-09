const generateConfig = require('./config/generate')
const createServer = require('../server')

module.exports = async function start (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  // Generate configuration
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions)

  const host = nuxtConfig.statusfy.host
  const port = nuxtConfig.statusfy.port

  // Initialize the server
  await createServer(siteConfig, nuxtConfig, host, port)
}
