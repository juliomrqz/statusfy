const container = require('markdown-it-container')
const { isRFC3339 } = require('./utils')

module.exports = md => {
  md.use(...createUpdateContainer('update'))
}

function createUpdateContainer(klass) {
  const parseInfo = (info) => info.match(/^update\s+(.*)\s+\|\s+(.*)$/)

  return [container, klass, {
    validate: function (params) {
      const match = parseInfo(params.trim())

      if (match !== null) {
        // Make sure the date is in RFC3339 format
        return isRFC3339(match[2])
      } else {
        return false
      }
    },
    render(tokens, idx) {
      const token = tokens[idx]

      if (token.nesting === 1) {
        const match = parseInfo(token.info.trim())
        const title = match[1].trim()
        const date = new Date(match[2]).toISOString()

        return `<div class="update-block">
          <div class="update-block-date">${date}</div>
          <div class="update-block-content">
            <div class="update-block-title">${title}</div>
            <div class="update-block-body">\n`
      } else {
        return `</div></div></div>\n`
      }
    }
  }]
}
