const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const { Nuxt } = require('nuxt-edge')

module.exports = async function createApp(config, host, port) {
  const app = express()

  app.set('port', port)
  app.set('host', host)

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const { Builder } = require('nuxt-edge')

    const builder = new Builder(nuxt)
    await builder.build()
  }

  if (!config.dev) {
    app.use(
      helmet({
        dnsPrefetchControl: false
      })
    )
  }

  app.use(cors())
  // parse application/json
  app.use(bodyParser.json())

  // Give nuxt middleware to express
  app.use(nuxt.render)

  return app
}
