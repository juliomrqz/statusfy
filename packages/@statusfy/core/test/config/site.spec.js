import { path } from '@statusfy/common'

import generateConfig from '@/core/lib/config/generate'
import loadConfig from '@/core/lib/config/load'

const tempPath = path.resolve(__dirname, '../.tmp')

describe('config:site', () => {
  const executeConfigTest = label => {
    const sourceDir = path.resolve(tempPath, label)
    const { siteConfig } = generateConfig(sourceDir, {})
    const siteConfigSourceDir = siteConfig.sourceDir

    siteConfig.sourceDir = path.relative(__dirname, sourceDir)

    expect(path.isAbsolute(siteConfigSourceDir)).toBeTruthy()
    expect(siteConfig).toMatchSnapshot()
  }

  test('simple', () => {
    executeConfigTest('simple')
  })

  test('cli', () => {
    executeConfigTest('cli')
  })

  test('advanced', () => {
    executeConfigTest('advanced')
  })

  test('spanish', () => {
    executeConfigTest('spanish')
  })

  test('invalid', () => {
    const sourceDir = path.resolve(tempPath, 'invalid')
    const loadedConfig = loadConfig(sourceDir)

    const siteConfigErrors = loadedConfig.errors

    expect(siteConfigErrors).toMatchSnapshot()
  })
})
