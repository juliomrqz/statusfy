import path from 'path'

import createDatabase from '@/content/database'
import generateConfig from '@/config/generate'

const tempPath = path.resolve(__dirname, '../.tmp')

describe('database:incidents', () => {
  const sourceDir = path.resolve(tempPath, 'advanced')
  const { siteConfig } = generateConfig(sourceDir, {})
  let database

  beforeAll(async () => {
    database = await createDatabase(siteConfig)
  })

  test('all', async () => {
    expect(database.incidents('en')).toMatchSnapshot()
    expect(database.incidents('es')).toMatchSnapshot()

    expect(database.incidents('en', 1, -1)).toMatchSnapshot()
    expect(database.incidents('es', 1, -1)).toMatchSnapshot()

    expect(database.incidents('en', 2, 10)).toMatchSnapshot()
    expect(database.incidents('es', 2, 10)).toMatchSnapshot()
  })

  test('history', async () => {
    expect(database.incidentsHistory('en')).toMatchSnapshot()
    expect(database.incidentsHistory('es')).toMatchSnapshot()

    expect(database.incidentsHistory('en', 1, 4)).toMatchSnapshot()
    expect(database.incidentsHistory('es', 1, 4)).toMatchSnapshot()

    expect(database.incidentsHistory('en', 2, 4)).toMatchSnapshot()
    expect(database.incidentsHistory('es', 2, 4)).toMatchSnapshot()
  })

  test('timeline', async () => {
    expect(database.incidentsTimeline('en')).toMatchSnapshot()
    expect(database.incidentsTimeline('es')).toMatchSnapshot()

    expect(database.incidentsTimeline('en', 4)).toMatchSnapshot()
    expect(database.incidentsTimeline('es', 4)).toMatchSnapshot()

    expect(database.incidentsTimeline('en', 14)).toMatchSnapshot()
    expect(database.incidentsTimeline('es', 14)).toMatchSnapshot()
  })
})
