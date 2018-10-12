const { join } = require('path')
const { Nuxt, Builder, Generator } = require('nuxt')

const generateConfig = require('./config/generate')
const { logger } = require('@statusfy/shared-utils')
const { fixHomePages } = require('./utils/fixes')

module.exports = async function generate (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  const outDir = cliOptions.outDir || join(sourceDir, 'dist')
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions)
  nuxtConfig.generate.dir = outDir

  if (!cliOptions.analyze) {
    delete nuxtConfig.build.analyze
  }

  const nuxt = new Nuxt(nuxtConfig)
  const builder = new Builder(nuxt)
  const generator = new Generator(nuxt, builder)

  const generateOptions = {
    init: true,
    build: true
  }

  generator
    .generate(generateOptions)
    .then(() => {
      fixHomePages(siteConfig, outDir)

      process.exit(0)
    })
    .catch(err => logger.fatal(err))
}
