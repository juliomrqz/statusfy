import path from 'path'
import consola from 'consola'

import generateConfig from '@/config/generate'
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
    const realProcess = process
    const exitMock = jest.fn()
    consola.clear().add({
      log: jest.fn()
    })
    global.process = { ...realProcess, exit: exitMock }

    const sourceDir = path.resolve(tempPath, 'invalid')
    generateConfig(sourceDir, {})

    expect(consola.reporters[0]['log'].mock['calls'][0][0]['additional']).toMatchSnapshot()
    expect(exitMock).toHaveBeenCalledWith(1)
    global.process = realProcess
  })
})
