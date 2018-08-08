const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const hash = require('hash-sum')
const template = require('lodash/template')

const localeTemplate = fs.readFileSync(path.resolve(__dirname, './locale.js.tpl'))

module.exports = function Statusfy () {
  // Merge all option sources
  const options = this.options.statusfy

  // Create language files
  options.locales.forEach(locale => {
    const localePath = path.resolve(__dirname, '../../', options.langDir, `${locale.code}.js`)
    let localePaths = []

    // Default locale
    const defaultLocalePath = path.resolve(__dirname, '../../', 'locales', `${locale.code}-default.json`)
    if (fs.existsSync(defaultLocalePath)) {
      localePaths.push(defaultLocalePath)
    }

    // User locale
    const userLocalePath = path.join(options.sourceDir, 'locales', `${locale.code}.json`)
    if (fs.existsSync(userLocalePath)) {
      localePaths.push(userLocalePath)
    }

    // Crate locale file content
    const compiledTemplate = template(localeTemplate)
    const fileContent = compiledTemplate({ localePaths, hash })

    fse.outputFileSync(localePath, fileContent)
  })

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js.tpl'),
    fileName: 'statusfy.js',
    options
  })
}

module.exports.meta = require('../../../package.json')
