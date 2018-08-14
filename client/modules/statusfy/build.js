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
          compilation.assets[`${pathPrefix}/systems.${locale.code}.json`] = asset(database.allSystems(locale.code))
        })

        cb()
      })
    }
  })
}
