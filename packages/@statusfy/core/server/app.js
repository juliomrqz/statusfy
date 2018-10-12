const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const { Nuxt } = require('nuxt')

const language = require('./middlewares/language')
const buildApiRouter = require('./api')

module.exports = async function createApp (siteConfig, nuxtConfig, host, port, apiPrefix = '') {
  const app = express()

  app.set('port', port)
  app.set('host', host)

  // Save Config
  app.use((req, res, next) => {
    req.app.set('siteConfig', siteConfig)

    next()
  })

  if (nuxtConfig && !nuxtConfig.dev) {
    app.use(
      helmet({
        dnsPrefetchControl: false
      })
    )
  }

  app.use(cors())
  // parse application/json
  app.use(bodyParser.json())
  app.use(language)

  if (nuxtConfig && nuxtConfig.statusfy.publicFilesPath) {
    app.use(require('serve-static')(nuxtConfig.statusfy.publicFilesPath))
  }

  app.use(`${apiPrefix}/api/v1`, buildApiRouter(siteConfig))

  if (nuxtConfig) {
    // Init Nuxt.js
    const nuxt = new Nuxt(nuxtConfig)

    // Build only in dev mode
    if (nuxtConfig.dev) {
      const {
        Builder
      } = require('nuxt')

      const builder = new Builder(nuxt)
      await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)
  }

  return app
}
