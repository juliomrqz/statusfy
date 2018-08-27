import path from 'path'

export function getFragment (name) {
  const target = path.resolve(__dirname, `fragments/${name}.js`)
  const content = require(target)

  return content
}
