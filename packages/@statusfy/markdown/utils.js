const isRFC3339 = require('validator/lib/isRFC3339')
const path = require('upath')
const fse = require('fs-extra')
const matter = require('gray-matter')
const toml = require('toml')

function grayMatterParse(input) {
  return matter(input, {
    excerpt: false,
    engines: {
      toml: toml.parse.bind(toml)
    }
  })
}

module.exports = {
  isRFC3339,
  path,
  fse,
  grayMatterParse
}
