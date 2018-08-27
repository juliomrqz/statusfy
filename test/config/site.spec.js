import path from 'path'
import consola from 'consola'
import { getFragment } from './utils'

import generateConfig from '@/config/generate'
const sourceDir = path.resolve(__dirname, '../../demo')

describe('config:site', () => {
  const configLabels = ['simple', 'cli', 'advanced']

  configLabels.forEach(label => {
    test(label, () => {
      const content = getFragment(label)
      const { siteConfig } = generateConfig(sourceDir, {}, content)
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

    const content = getFragment('invalid')
    generateConfig(sourceDir, {}, content)

    expect(consola.reporters[0]['log'].mock['calls'][0][0]['additional']).toMatchSnapshot()
    expect(exitMock).toHaveBeenCalledWith(1)
    global.process = realProcess
  })
})
