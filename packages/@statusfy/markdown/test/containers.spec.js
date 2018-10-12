import { md, getFragment } from './utils'
import containers from '@/markdown/containers.js'

const mdC = md().use(containers)

describe('containers', () => {
  const containerLabels = ['investigating', 'resolved', 'monitoring']

  containerLabels.forEach(label => {
    test(label, async () => {
      const input = await getFragment(`container-${label}`)
      const output = mdC.render(input)

      expect(output).toMatchSnapshot()
    })
  })
})
