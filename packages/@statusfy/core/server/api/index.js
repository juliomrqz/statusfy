const { Router } = require('express')

const buildIncidentsRouter = require('./incidents')
const buildSystemsRouter = require('./systems')

const buildRouter = (siteConfig) => {
  const router = Router()

  // Add Routes
  router.use(buildIncidentsRouter(siteConfig))
  router.use(buildSystemsRouter(siteConfig))

  return router
}

module.exports = buildRouter
