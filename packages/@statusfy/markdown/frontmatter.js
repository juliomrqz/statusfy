const { grayMatterParse } = require('./utils')

module.exports = md => {
  md.frontmatter = md.frontmatter || {}
  md.block.ruler.before('code', 'frontmatter', frontmatter.bind(null, md), {
    alt: []
  })
}

function frontmatter(md, state, start, end, silent) {
  const lines = state.src.split('\n')

  if (start !== 0 || state.blkIndent !== 0 || state.tShift[start] < 0) {
    return false
  }

  // Fist line must start with ---(optional engine name)
  if (!lines[0].match(/^---(toml|json|yaml|yml)?$/)) {
    return false
  }

  // Detect end line number of the front-matter
  let line = 0

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].match(/^---$/)) {
      line = i
      break
    }
  }

  if (line === 0) {
    return false
  }

  // Parse front-matter
  const matterData = grayMatterParse(state.src)

  md.frontmatter = matterData.data || {}
  state.line = line + 1

  return true
}
