const { Router } = require('express')

const createDatabase = require('../../lib/content/database')
const response = require('../utils/response')

const router = Router()

router.get('/systems', async (req, res, next) => {
  const language = req.app.get('language')
  const send = response(res, language)

  try {
    const database = await createDatabase(req.app.get('siteConfig'))

    send.json(database.allSystems(language))
  } catch (error) {
    next(error)
  }
})

module.exports = router
