const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const { Nuxt } = require('nuxt-edge')

const language = require('./middlewares/language')
const api = require('./api')

module.exports = async function createApp (config, host, port, siteConfig) {
  const app = express()

  app.set('port', port)
  app.set('host', host)

  // Save Config
  app.use((req, res, next) => {
    req.app.set('siteConfig', siteConfig)

    next()
  })

  if (config && !config.dev) {
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

  app.use('/api/v1', api)

  if (config) {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Build only in dev mode
    if (config.dev) {
      const {
        Builder
      } = require('nuxt-edge')

      const builder = new Builder(nuxt)
      await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)
  }

  return app
}
