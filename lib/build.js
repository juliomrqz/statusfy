// Based on https://github.com/nuxt/nuxt.js/blob/dev/bin/nuxt-build
const { Nuxt, Builder } = require('nuxt')

const generateConfig = require('./config/generate')
const logger = require('./utils/logger')

module.exports = async function build (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  const { nuxtConfig } = generateConfig(sourceDir, cliOptions)

  if (!cliOptions.analyze) {
    delete nuxtConfig.build.analyze
  }

  const nuxt = new Nuxt(nuxtConfig)
  const builder = new Builder(nuxt)

  // Setup hooks
  nuxt.hook('error', err => logger.fatal(err))

  // Close function
  const close = () => {
    // In analyze mode wait for plugin
    // emitting assets and opening browser
    if (typeof nuxtConfig.build.analyze === 'object') {
      return
    }

    process.exit(0)
  }

  builder
    .build()
    .then(close)
    .catch(err => logger.fatal(err))
}
