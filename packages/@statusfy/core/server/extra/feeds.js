const { Router } = require('express')
const router = Router()

const createFeeds = require('../../lib/content/feeds')

router.get('/feeds/incidents.:lang.:ext', async (req, res, next) => {
  const siteConfig = req.app.get('siteConfig')

  if (!siteConfig.notifications || !siteConfig.notifications.feeds) {
    next()
  }

  const { lang, ext } = req.params

  try {
    const feeds = await createFeeds(siteConfig, lang)

    if (ext === 'xml') {
      res.set('Content-Type', 'application/rss+xml')
      return res.send(feeds.rss())
    } else if (ext === 'atom') {
      res.set('Content-Type', 'application/atom+xml')
      return res.send(feeds.atom())
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
