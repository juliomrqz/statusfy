const emoji = require('markdown-it-emoji')

const containers = require('./containers')
const frontmatter = require('./frontmatter')
const links = require('./links')

const markdown = ({ markdown = {} } = {}) => {
  const md = require('markdown-it')({
    html: true
  })
  // custom plugins
  .use(containers)
  .use(frontmatter)
  .use(links)

  // 3rd party plugins
  .use(emoji)

  // apply user config
  if (markdown.config) {
    markdown.config(md)
  }

  return md
}

module.exports = {
  markdown
}
