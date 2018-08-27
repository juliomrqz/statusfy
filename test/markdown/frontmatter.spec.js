import { md, getFragment } from './utils'
import frontmatter from '@/markdown/frontmatter.js'

const mdF = md().use(frontmatter)

describe('frontmatter', () => {
  const containerLabels = ['json', 'toml', 'yaml']

  containerLabels.forEach(label => {
    test(label, async () => {
      const input = await getFragment(`frontmatter-${label}`)
      mdF.render(input)

      expect(mdF.frontmatter).toMatchSnapshot()
    })
  })
})
