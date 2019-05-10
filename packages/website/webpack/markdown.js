const fs = require('fs-extra')

const MarkdownIt = require('markdown-it')
const MarkdownItAttrs = require('markdown-it-attrs')
const MarkdownItInlineComments = require('markdown-it-inline-comments')
const MarkdownItLinkAttributes = require('markdown-it-link-attributes')
const MarkdownItPrism = require('markdown-it-prism')
const MarkdownItGithubHeadings = require('markdown-it-github-headings')
const frontmatter = require('front-matter')
const { count } = require('@wordpress/wordcount')
const spawn = require('cross-spawn')

const getGitLastUpdatedTimeStamp = (filepath) => {
  const { stdout } = spawn.sync("git", ["log", "-1", "--format=%ct", filepath]);

  try {
    return new Date(parseInt(stdout.toString("utf-8")) * 1000).toISOString()
  } catch (error) {
    return new Date().toISOString()
  }
};

export default (filePath, source) => {
  const md = new MarkdownIt({
    linkify: true,
    breaks: true,
    html: true
  })

  md.use(MarkdownItAttrs)
  md.use(MarkdownItInlineComments)
  md.use(MarkdownItLinkAttributes, [
    {
      pattern: /^https:\/\/statusfy.co/,
      attrs: {
        class: 'internal-link'
      }
    },
    {
      pattern: /^https:\/\/www.bazzite.com/,
      attrs: {
        target: '_blank',
        rel: 'noopener'
      }
    },
    {
      pattern: /^https?:\/\//,
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }
  ])
  md.use(MarkdownItPrism, {})
  md.use(MarkdownItGithubHeadings, {
    prefix: 'content-',
    linkIcon: '#'
  })

  // define initial properties
  const content = source ? source : fs.readFileSync(filePath, 'utf8')
  const { body, attributes } = frontmatter(content)
  const wordCount = count(body, 'words', {})
  const html = md.render(body)

  attributes.wordCount = wordCount
  attributes.readingTime = Math.ceil(wordCount / 200)
  attributes.modified = getGitLastUpdatedTimeStamp(filePath)

  return {
    body,
    html,
    attributes
  }
}
