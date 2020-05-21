module.exports = function(eleventyConfig) {
  // eleventyConfig.addPassthroughCopy('src/images')

  return {
    dir: { input: './', output: 'dist' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk'
  }
}
