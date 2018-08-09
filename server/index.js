const path = require('path')
const createApp = require('./app')
const loadConfig = require('../lib/config/load')

const sourceDir = path.join(__dirname, '..', 'demo')
const siteConfig = loadConfig(sourceDir)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

async function start () {
  const app = await createApp(null, host, port, siteConfig)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
