const matter = require('gray-matter')
const toml = require('toml')
const tomlify = require('tomlify-j0.4')

const parse = (input) => {
  return matter(input, {
    excerpt: false,
    engines: {
      toml: toml.parse.bind(toml)
    }
  })
}

const stringify = (content, data, format) => {
  return matter.stringify(
    content,
    data, {
      excerpt: false,
      language: format,
      engines: {
        toml: {
          parse: toml.parse.bind(toml),
          stringify: tomlify.toToml.bind(tomlify)
        }
      }
    })
}

module.exports = {
  parse,
  stringify
}
