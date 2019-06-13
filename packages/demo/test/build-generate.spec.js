import glob from 'glob-promise'
import { path, fse } from '@statusfy/common'

describe('build-generate', () => {
  const sourceDir = path.resolve(__dirname, '..')

  test('manifest.json', async () => {
    try {
      const files = await glob(`${path.resolve(sourceDir, 'dist', 'static')}/manifest*.json`)
      const fileContent = await fse.readJSON(files[0], 'utf-8')

      fileContent.icons.forEach(icon => {
        icon.src = icon.src.replace(/\w+\.png/, 'png')
      });

      expect(fileContent).toMatchSnapshot()
    } catch (error) {
      throw error;
    }
  })

  test('statusfy.js', async () => {
    const fileContent = await fse.readFile(path.resolve(sourceDir, '.statusfy', 'statusfy.js'), 'utf-8')

    expect(fileContent).toContain("mainLogo")
    expect(fileContent).toContain("iconSizes: [16, 120, 144, 152, 192, 384, 512]")
  })

  test('sw.js', async () => {
    const swContent = await fse.readFile(path.resolve(sourceDir, 'dist', 'sw.js'), 'utf-8')

    expect(swContent).toContain("workbox.precaching.cleanupOutdatedCaches()")
    expect(swContent).toContain("workbox.routing.registerRoute(new RegExp('/static/(?!content).*$'), new workbox.strategies.CacheFirst ({}), 'GET')")
    expect(swContent).toContain("workbox.routing.registerRoute(new RegExp('(/static/content)?/api/v0/.*'), new workbox.strategies.NetworkFirst ({\"cacheName\":\"demo_system_status_api\",\"cacheExpiration\":{\"maxEntries\":10,\"maxAgeSeconds\":300}}), 'GET')")
  })
})
