// Based on https://github.com/nuxt/nuxt.js/blob/dev/bin/nuxt-build
const { Nuxt, Builder } = require('nuxt')

const { logger } = require('@statusfy/common')

const generateConfig = require('./config/generate')

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

  try {
    await builder.build()
    close()
  } catch (error) {
    logger.fatal(error)
  }
}
