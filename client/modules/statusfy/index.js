const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const defaultsDeep = require('lodash/defaultsDeep')

const logger = require('../../../lib/utils/logger')
const createServer = require('../../../server')
const buildContent = require('./build')

module.exports = async function Statusfy () {
  // Merge all option sources
  const statusfyOptions = this.options.statusfy

  // Create language files
  statusfyOptions.locales.forEach(locale => {
    const localePath = path.resolve(__dirname, '../../', statusfyOptions.langDir, `${locale.code}.js`)
    let defaultLocaleContent = {}
    let userLocaleContent = {}

    // Default locale
    const defaultLocalePath = path.resolve(__dirname, '../../', 'locales', `${locale.code}-default.json`)
    if (fs.existsSync(defaultLocalePath)) {
      defaultLocaleContent = require(defaultLocalePath)
    }

    // User locale
    if (locale.file) {
      const userLocalePath = path.join(statusfyOptions.sourceDir, 'locales', locale.file)
      if (fs.existsSync(userLocalePath)) {
        userLocaleContent = require(userLocalePath)
      }
    }

    // Crate locale file content
    const messages = JSON.stringify(defaultsDeep(userLocaleContent, defaultLocaleContent), null, 2)
    const fileContent = `export default ${messages}`

    fse.outputFileSync(localePath, fileContent)
  })

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js.tpl'),
    fileName: 'statusfy.js',
    options: statusfyOptions
  })

  this.nuxt.hook('build:before', async builder => {
    const isStatic = builder.isStatic

    if (isStatic) {
      this.nuxt.hook('build:done', async generator => {
        if (isStatic) {
          logger.debug('Open the server connection')

          statusfyOptions.siteConfig.build.isStatic = true

          const server = await createServer(
            statusfyOptions.siteConfig,
            null,
            this.options.server.host,
            this.options.server.port,
            '/static/content'
          )

          this.nuxt.hook('generate:done', () => {
            logger.debug('Close the server connection')
            server.close()
          })
        }
      })
    }

    // Build dynamic content pages
    await buildContent(this, isStatic)
  })
}

module.exports.meta = require('../../../package.json')
