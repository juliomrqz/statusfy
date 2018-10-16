import path from 'path'

import generateConfig from '@/core/lib/config/generate'
import loadConfig from '@/core/lib/config/load'

const tempPath = path.resolve(__dirname, '../.tmp')

describe('config:site', () => {
  const configLabels = ['simple', 'cli', 'advanced']

  configLabels.forEach(label => {
    test(label, () => {
      const sourceDir = path.resolve(tempPath, label)
      const { siteConfig } = generateConfig(sourceDir, {})
      const siteConfigSourceDir = siteConfig.sourceDir

      siteConfig.sourceDir = path.relative(__dirname, sourceDir)

      expect(path.isAbsolute(siteConfigSourceDir)).toBeTruthy()
      expect(siteConfig).toMatchSnapshot()
    })
  })

  test('invalid', () => {
    const sourceDir = path.resolve(tempPath, 'invalid')
    const loadedConfig = loadConfig(sourceDir)

    const siteConfigErrors = loadedConfig.errors

    expect(siteConfigErrors).toMatchSnapshot()
  })
})
