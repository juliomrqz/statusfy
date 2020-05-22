const { fse, path } = require('../utils')

export function md () {
  return require('markdown-it')()
}

export async function getFragment (name) {
  const target = path.resolve(__dirname, `fragments/${name}.md`)
  const content = await fse.readFile(target, 'utf-8')

  return content
}
