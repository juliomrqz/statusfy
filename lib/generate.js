const { Nuxt, Builder, Generator } = require('nuxt-edge')

const generateConfig = require('./config/generate')
const logger = require('./utils/logger')

module.exports = async function generate (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  const config = generateConfig(sourceDir, cliOptions)

  const nuxt = new Nuxt(config)
  const builder = new Builder(nuxt)
  const generator = new Generator(nuxt, builder)

  const generateOptions = {
    init: true,
    build: true
  }

  generator
    .generate(generateOptions)
    .then(() => {
      process.exit(0)
    })
    .catch(err => logger.fatal(err))
}
