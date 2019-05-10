const { path } = require('@vuepress/shared-utils')

module.exports = options => ({
  enhanceAppFiles () {
    return [path.resolve(__dirname, 'enhanceAppFile.js')]
  },
  globalUIComponents: ['ExtraSeo']
})
