const { validator } = require('@statusfy/shared-utils')

module.exports = md => {
  // Remember old renderer, if overridden, or proxy to default renderer
  const defaultRender = md.renderer.rules.link_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hIndex = token.attrIndex('href')
    const isExternalLink = validator.isURL(token.attrs[hIndex][1])

    if (isExternalLink) {
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener noreferrer')
      token.attrSet('class', 'external')
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self)
  }
}
