import isString from 'lodash.isstring'
import cloneDeepWith from 'lodash.clonedeepwith'
import { path } from '@statusfy/common'

import generateConfig from '@/core/lib/config/generate'
const tempPath = path.resolve(__dirname, '../.tmp')

const relative = (dir) => {
  return path.relative(__dirname, dir)
}

describe('config:nuxt', () => {
  const executeConfigTest = label => {
    const sourceDir = path.resolve(tempPath, label)

    const generatedConfig = generateConfig(sourceDir, {})
    let nuxtConfig = generatedConfig.nuxtConfig

    // Check absolute dirs
    expect(path.isAbsolute(nuxtConfig.buildDir)).toBeTruthy()
    expect(path.isAbsolute(nuxtConfig.generate.dir)).toBeTruthy()
    expect(path.isAbsolute(nuxtConfig.icon.iconSrc)).toBeTruthy()
    expect(path.isAbsolute(nuxtConfig.rootDir)).toBeTruthy()
    // expect(path.isAbsolute(nuxtConfig.srcDir)).toBeTruthy()
    expect(path.isAbsolute(nuxtConfig.statusfy.assets.mainLogo)).toBeTruthy()

    if (nuxtConfig.statusfy.publicFilesPath) {
      expect(path.isAbsolute(nuxtConfig.statusfy.publicFilesPath)).toBeTruthy()
    }
    expect(path.isAbsolute(nuxtConfig.statusfy.siteConfig.sourceDir)).toBeTruthy()

    if (nuxtConfig.workbox) {
      expect(path.isAbsolute(nuxtConfig.workbox.globDirectory)).toBeTruthy()
    }

    for (const dir of nuxtConfig.modulesDir) {
      expect(isString(dir)).toBeTruthy()
    }

    expect(nuxtConfig.modulesDir.length).toBeGreaterThanOrEqual(2)

    // Convert absolute paths to relative
    nuxtConfig = cloneDeepWith(nuxtConfig, (value) => {
      if (isString(value) && path.isAbsolute(value)) {
        const relativePath = path.normalize(relative(value))

        if (relativePath.split('../').length <= 3) {
          return path.toUnix(path.normalize(relative(value)))
        }
      }
    })

    // Check config
    expect(nuxtConfig).toMatchSnapshot()
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
})
