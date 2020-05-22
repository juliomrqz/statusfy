const path = require('path')
const { markdown } = require('@statusfy/markdown')

const site = require(path.resolve(__dirname, '_data/site.js'))

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdown());

  // Include our static assets
  eleventyConfig.addPassthroughCopy("images")
  eleventyConfig.addPassthroughCopy("styles")

  // Layout aliases
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
  eleventyConfig.addLayoutAlias('incident', 'layouts/incident.njk')

  // filters
  eleventyConfig.addFilter("localePath", function(value, locale) {
    if (locale === site.config.defaultLocale) {
      return value
    } else {
      return `/${locale}${value}`
    }
  });

  return {
    dir: { input: './', output: 'dist' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk'
  }
}
