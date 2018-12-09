const createSitemap = require('../../lib/content/sitemap')

module.exports = async (req, res, next) => {
  const siteConfig = req.app.get('siteConfig')
  const sitemap = await createSitemap(siteConfig)

  res.header('Content-Type', 'application/xml')
  res.send(sitemap.toString())
}
