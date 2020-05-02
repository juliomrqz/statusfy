import { md } from './utils'
import links from '@/markdown/links.js'

const mdL = md().use(links)

const internalLinkAsserts = {
  '/': '/',
  '/foo/': '/foo/',
  '/foo/#hash': '/foo/#hash'
}

const externalLinks = [
  '[Statusfy](https://aceforth.com/products/statusfy)',
  '[Statusfy](http://statusfy.co)',
  '[Statusfy Docs](http://docs.statusfy.co)'
]

describe('links', () => {
  test('should render internal links correctly', () => {
    for (const before in internalLinkAsserts) {
      const input = `[${before}](${before})`
      const output = mdL.render(input)

      expect(output).toMatchSnapshot()
    }
  })

  test('should render external links correctly', () => {
    for (const link of externalLinks) {
      const output = mdL.render(link)

      expect(output).toMatchSnapshot()
    }
  })
})
