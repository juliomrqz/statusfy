// Based on https://github.com/nuxt/nuxt.js/blob/dev/bin/nuxt-build
const { Nuxt, Builder } = require('nuxt-edge')

const generateConfig = require('./config/generate')
const logger = require('./utils/logger')

module.exports = async function build (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  const config = generateConfig(sourceDir, cliOptions)

  const nuxt = new Nuxt(config)
  const builder = new Builder(nuxt)

  // Setup hooks
  nuxt.hook('error', err => logger.fatal(err))

  // Close function
  const close = () => {
    // In analyze mode wait for plugin
    // emitting assets and opening browser
    if (typeof config.build.analyze === 'object') {
      return
    }

    process.exit(0)
  }

  builder
    .build()
    .then(close)
    .catch(err => logger.fatal(err))
}
