const path = require('path')
const fs = require('fs-extra')
const { Nuxt, Builder, Generator } = require('nuxt-edge')

const generateConfig = require('./config/generate')
const loadConfig = require('./config/load')
const logger = require('./utils/logger')

module.exports = async function generate (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  const outDir = cliOptions.outDir || path.join(sourceDir, 'dist')
  const config = generateConfig(sourceDir, cliOptions)
  config.generate.dir = outDir
  const siteConfig = loadConfig(sourceDir)

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
      // Nuxt bug: Fix the home page file of each locale
      siteConfig.locales.forEach(locale => {
        if (locale.code !== siteConfig.defaultLocale) {
          const from = path.join(outDir, locale.code, '.html')
          const to = path.join(outDir, `${locale.code}.html`)

          fs.moveSync(from, to)
        }
      })

      process.exit(0)
    })
    .catch(err => logger.fatal(err))
}
