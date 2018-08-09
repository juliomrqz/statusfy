const { Router } = require('express')

const createDatabase = require('../../lib/content/database')

const router = Router()

const cacheHeaderName =
  process.env.NODE_ENV === 'production' ? 'Cache-Control' : 'X-Cache-Control'

router.get('/incidents', async function (req, res, next) {
  const language = req.app.get('language')

  try {
    const database = await createDatabase(req.app.get('siteConfig'))

    res.set(cacheHeaderName, 'public, max-age=600, s-maxage=14400')
    res.json(database.all(language))
  } catch (error) {
    next(error)
  }
})

router.get('/incidents/:id', async function (req, res, next) {
  const { id } = req.params
  const language = req.app.get('language')

  try {
    const database = await createDatabase(req.app.get('siteConfig'))

    res.set(cacheHeaderName, 'public, max-age=600, s-maxage=14400')
    res.json(database.get(id, language))
  } catch (error) {
    next(error)
  }
})

module.exports = router
