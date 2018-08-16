const createDatabase = require('../../../lib/content/database')

const asset = object => {
  // webpack asset
  const content = JSON.stringify(
    object,
    null,
    process.env.NODE_ENV === 'production' ? 0 : 2
  )
  return {
    source: () => content,
    size: () => content.length
  }
}

module.exports = async function buildContent (nuxt, buildDir, isStatic, options) {
  const database = await createDatabase(nuxt.options.statusfy.siteConfig)
  const pathPrefix = '/content/api/v1'

  nuxt.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        nuxt.options.statusfy.locales.forEach(locale => {
          // Systems
          compilation.assets[`${pathPrefix}/systems.${locale.code}.json`] =
            asset(database.allSystems(locale.code))

          // Timeline
          compilation.assets[`${pathPrefix}/incidents/timeline.${locale.code}.json`] =
            asset(database.allIncidentsTimeline(locale.code))

          // History Pages
          const historyPage1 = database.allIncidents(locale.code)
          let currentPage = 1
          let totalPages = historyPage1.total_pages

          while (currentPage <= totalPages) {
            const data = database.allIncidents(locale.code, currentPage)

            compilation.assets[`${pathPrefix}/incidents.page-${currentPage}.${locale.code}.json`] =
              asset(data)

            currentPage = data.page + 1
          }
        })

        cb()
      })
    }
  })

  // Add Dynamic Pages
  nuxt.options.generate.routes = []

  nuxt.options.statusfy.locales.forEach(locale => {
    const prefix = locale.code === nuxt.options.statusfy.siteConfig.defaultLocale ? '' : `/${locale.code}`

    // History Pages
    let totalPages = database.allIncidents(locale.code).total_pages

    for (let i = 2; i <= totalPages; i++) {
      nuxt.options.generate.routes.push(`${prefix}/history/${i}`)
    }
  })
}
