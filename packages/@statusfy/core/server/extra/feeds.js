const { Router } = require('express')
const router = Router()

const createFeeds = require('../../lib/content/feeds')

router.get('/feeds/incidents:postfix', async (req, res, next) => {
  const siteConfig = req.app.get('siteConfig')
  const { postfix } = req.params

  try {
    const p = /(\.\w+\.)?(atom|xml)/i
    const m = p.exec(postfix)

    if (m !== null) {
      let lang = m[1] ? m[1].replace(/\./g, '') : siteConfig.defaultLocale
      let ext = m[2]

      const feeds = await createFeeds(siteConfig, lang)

      if (ext === 'xml') {
        res.set('Content-Type', 'application/rss+xml')
        return res.send(feeds.rss())
      } else if (ext === 'atom') {
        res.set('Content-Type', 'application/atom+xml')
        return res.send(feeds.atom())
      }
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
