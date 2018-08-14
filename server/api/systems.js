const { Router } = require('express')

const createDatabase = require('../../lib/content/database')
const response = require('../utils/response')

const buildRouter = (siteConfig) => {
  const router = Router()
  const systemsPath = siteConfig.build.isStatic
    ? '/systems.:lang.json'
    : '/systems'

  router.get(systemsPath, async (req, res, next) => {
    const language = req.params.lang || req.app.get('language')
    const send = response(res, language)

    try {
      const database = await createDatabase(req.app.get('siteConfig'))

      send.json(database.allSystems(language))
    } catch (error) {
      next(error)
    }
  })

  return router
}

module.exports = buildRouter
