import { path } from '@statusfy/common'

import loadConfig from '@/core/lib/config/load'

const formatPath = path.resolve(__dirname, 'fragments', 'formats')

describe('config:formats', () => {
  const executeConfigTest = label => {
    const sourceDir = path.resolve(formatPath, label)

    const { config } = loadConfig(sourceDir)
    config.sourceDir = path.relative(__dirname, config.sourceDir)

    expect(config).toMatchSnapshot()
  }

  test('js-es5', () => {
    executeConfigTest('js-es5')
  })

  test('js-es6', () => {
    executeConfigTest('js-es6')
  })

  test('toml', () => {
    executeConfigTest('toml')
  })

  test('yaml', () => {
    executeConfigTest('yaml')
  })
})
