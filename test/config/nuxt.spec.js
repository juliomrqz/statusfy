import path, { isAbsolute } from 'path'
import _ from 'lodash'

import generateConfig from '@/config/generate'
import { getFragment } from './utils'
const sourceDir = path.resolve(__dirname, '../../demo')

const relative = (dir) => {
  return path.relative(__dirname, dir)
}

describe('config:nuxt', () => {
  const configLabels = ['simple', 'cli', 'advanced']

  configLabels.forEach(label => {
    test(label, () => {
      const content = getFragment(label)
      const generatedConfig = generateConfig(sourceDir, {}, content)
      let nuxtConfig = generatedConfig.nuxtConfig

      // Check absolute dirs
      expect(isAbsolute(nuxtConfig.buildDir)).toBeTruthy()
      expect(isAbsolute(nuxtConfig.generate.dir)).toBeTruthy()
      expect(isAbsolute(nuxtConfig.icon.iconSrc)).toBeTruthy()
      expect(isAbsolute(nuxtConfig.rootDir)).toBeTruthy()
      // expect(isAbsolute(nuxtConfig.srcDir)).toBeTruthy()
      expect(isAbsolute(nuxtConfig.statusfy.assets.mainLogo)).toBeTruthy()
      expect(isAbsolute(nuxtConfig.statusfy.publicFilesPath)).toBeTruthy()
      expect(isAbsolute(nuxtConfig.statusfy.siteConfig.sourceDir)).toBeTruthy()
      expect(isAbsolute(nuxtConfig.workbox.globDirectory)).toBeTruthy()
      for (const dir of nuxtConfig.modulesDir) {
        expect(isAbsolute(dir)).toBeTruthy()
      }

      expect(nuxtConfig.modulesDir).toHaveLength(2)

      // Convert absolute paths to relative
      nuxtConfig = _.cloneDeepWith(nuxtConfig, (value) => {
        if (_.isString(value) && isAbsolute(value)) {
          const relativePath = path.normalize(relative(value))

          if (relativePath.split('../').length <= 3) {
            return path.normalize(relative(value))
          }
        }
      })

      // Check config
      expect(nuxtConfig).toMatchSnapshot()
    })
  })
})
