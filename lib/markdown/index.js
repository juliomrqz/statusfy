const emoji = require('markdown-it-emoji')

const containers = require('./containers')
const frontmatter = require('./frontmatter')

module.exports = ({ markdown = {} } = {}) => {
  const md = require('markdown-it')({
    html: true
  })
  // custom plugins
  .use(containers)
  .use(frontmatter)

  // 3rd party plugins
  .use(emoji)

  // apply user config
  if (markdown.config) {
    markdown.config(md)
  }

  return md
}
