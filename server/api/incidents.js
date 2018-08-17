const { Router } = require('express')

const createDatabase = require('../../lib/content/database')
const response = require('../utils/response')

const buildRouter = (siteConfig) => {
  const router = Router()
  const incidentsPath = siteConfig.build.isStatic
    ? '/incidents.page-:page.:lang.json'
    : '/incidents'
  const incidentsHistoryPath = siteConfig.build.isStatic
    ? '/incidents/history.page-:page.:lang.json'
    : '/incidents/history'
  const incidentTimelinePath = siteConfig.build.isStatic
    ? '/incidents/timeline.:lang.json'
    : '/incidents/timeline'
  const incidentPath = siteConfig.build.isStatic
    ? '/incidents/:id.:lang.json'
    : '/incidents/:id'

  router.get(incidentsPath, async (req, res, next) => {
    const language = req.params.lang || req.app.get('language')
    const page = req.query.page || req.params.lang || 1
    const send = response(res, language)

    try {
      const database = await createDatabase(req.app.get('siteConfig'))
      const data = database.incidents(language, Number(page))

      if (data.page > data.total_pages) {
        send.notFound()
      } else {
        send.json(data)
      }
    } catch (error) {
      next(error)
    }
  })

  router.get(incidentsHistoryPath, async (req, res, next) => {
    const language = req.params.lang || req.app.get('language')
    const page = req.query.page || req.params.lang || 1
    const send = response(res, language)

    try {
      const database = await createDatabase(req.app.get('siteConfig'))
      const data = database.incidentsHistory(language, Number(page))

      if (data.page > data.total_pages) {
        send.notFound()
      } else {
        send.json(data)
      }
    } catch (error) {
      next(error)
    }
  })

  router.get(incidentTimelinePath, async (req, res, next) => {
    const language = req.params.lang || req.app.get('language')
    const send = response(res, language)

    try {
      const database = await createDatabase(req.app.get('siteConfig'))

      send.json(database.incidentsTimeline(language))
    } catch (error) {
      next(error)
    }
  })

  router.get(incidentPath, async (req, res, next) => {
    const { id } = req.params
    const language = req.params.lang || req.app.get('language')
    const send = response(res, language)

    try {
      const database = await createDatabase(req.app.get('siteConfig'))
      const incident = database.incident(id, language)

      if (incident) {
        send.json(database.incident(id, language))
      } else {
        send.notFound('Incident not found.')
      }
    } catch (error) {
      next(error)
    }
  })

  return router
}

module.exports = buildRouter
