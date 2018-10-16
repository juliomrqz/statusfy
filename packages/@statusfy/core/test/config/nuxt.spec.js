import path, { isAbsolute } from 'path'
import isString from 'lodash.isstring'
import cloneDeepWith from 'lodash.clonedeepwith'

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
    expect(isAbsolute(nuxtConfig.buildDir)).toBeTruthy()
    expect(isAbsolute(nuxtConfig.generate.dir)).toBeTruthy()
    expect(isAbsolute(nuxtConfig.icon.iconSrc)).toBeTruthy()
    expect(isAbsolute(nuxtConfig.rootDir)).toBeTruthy()
    // expect(isAbsolute(nuxtConfig.srcDir)).toBeTruthy()
    expect(isAbsolute(nuxtConfig.statusfy.assets.mainLogo)).toBeTruthy()
    if (nuxtConfig.statusfy.publicFilesPath) {
      expect(isAbsolute(nuxtConfig.statusfy.publicFilesPath)).toBeTruthy()
    }
    expect(isAbsolute(nuxtConfig.statusfy.siteConfig.sourceDir)).toBeTruthy()
    expect(isAbsolute(nuxtConfig.workbox.globDirectory)).toBeTruthy()
    for (const dir of nuxtConfig.modulesDir) {
      expect(isString(dir)).toBeTruthy()
    }

    expect(nuxtConfig.modulesDir.length).toBeGreaterThanOrEqual(2)

    // Convert absolute paths to relative
    nuxtConfig = cloneDeepWith(nuxtConfig, (value) => {
      if (isString(value) && isAbsolute(value)) {
        const relativePath = path.normalize(relative(value))

        if (relativePath.split('../').length <= 3) {
          return path.normalize(relative(value))
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
})
