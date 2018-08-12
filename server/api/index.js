const { Router } = require('express')

const createDatabase = require('../../lib/content/database')
const response = require('../utils/response')

const router = Router()

router.get('/incidents', async (req, res, next) => {
  const language = req.app.get('language')
  const send = response(res, language)

  try {
    const database = await createDatabase(req.app.get('siteConfig'))

    send.json(database.all(language))
  } catch (error) {
    next(error)
  }
})

router.get('/incidents/:id', async (req, res, next) => {
  const { id } = req.params
  const language = req.app.get('language')
  const send = response(res, language)

  try {
    const database = await createDatabase(req.app.get('siteConfig'))
    const incident = database.get(id, language)

    if (incident) {
      send.json(database.get(id, language))
    } else {
      send.notFound('Incident not found.')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
