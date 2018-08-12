const { readdir, stat, readFile } = require('fs')
const { promisify } = require('util')
const path = require('path')
const hash = require('hash-sum')
const LRU = require('lru-cache')
const spawn = require('cross-spawn')
const orderBy = require('lodash/orderBy')

const createMarkdown = require('../markdown')

const readdirP = promisify(readdir)
const statP = promisify(stat)
const readFileP = promisify(readFile)

const md = createMarkdown()
const cache = LRU({ max: 1000 })

const getGitLastUpdatedTimeStamp = (filepath) => {
  const { stdout } = spawn.sync('git', ['log', '-1', '--format=%ct', filepath])

  return parseInt(stdout.toString('utf-8')) * 1000
}

class Incident {
  constructor (fileContent, fileName) {
    // Save content
    this.content = md.render(fileContent)

    // Save properties
    const frontmatter = md.frontmatter
    this.title = frontmatter.title
    this.date = frontmatter.date
    this.modified = frontmatter.modified
    this.severity = frontmatter.severity
    this.affectedsystems = frontmatter.affectedsystems
    this.resolved = frontmatter.resolved
    this.id = frontmatter.id

    if (!this.id) {
      this.id = hash(fileName)
    }
  }

  getData () {
    return {
      id: this.id,
      title: this.title,
      date: this.date,
      modified: this.modified,
      severity: this.severity,
      affectedsystems: this.affectedsystems,
      resolved: this.resolved,
      content: this.content
    }
  }
}

const readIncidents = async (dirPath) => {
  const allIncidents = []

  const files = (await readdirP(dirPath)).map(f => path.join(dirPath, f))

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i]
    const isFile = (await statP(filePath)).isFile()

    if (isFile && path.extname(filePath) === '.md') {
      const fileName = path.relative(dirPath, filePath)
      const fileContent = (await readFileP(filePath)).toString('utf8')
      const incident = new Incident(fileContent, fileName).getData()

      if (!incident.modified) {
        incident.modified = new Date(getGitLastUpdatedTimeStamp(filePath)).toISOString()
      }

      allIncidents.push(incident)
    }
  }

  return allIncidents
}

module.exports = async function database (siteConfig) {
  const incidents = {}

  // Retrieve incidents for each language
  for (let i = 0; i < siteConfig.locales.length; i++) {
    const locale = siteConfig.locales[i]
    const cacheKey = `incidents-${locale.code}`
    let localeIncidents = cache.get(cacheKey)

    if (!localeIncidents) {
      let contentPath = path.join(siteConfig.sourceDir, siteConfig.contentConfig.dir)

      if (locale.code !== siteConfig.defaultLocale) {
        contentPath = path.join(contentPath, locale.code)
      }

      localeIncidents = await readIncidents(contentPath)
    }

    incidents[locale.code] = localeIncidents
    cache.set(cacheKey, localeIncidents)
  }

  return {
    all (lang) {
      const sortedIncidents = orderBy(incidents[lang], ['date'], 'desc')

      return {
        count: sortedIncidents.length,
        incidents: sortedIncidents
      }
    },
    get (id, lang) {
      return incidents[lang].filter(i => i.id === id)[0]
    },
    allSystems (lang) {
      const systems = {}
      const systemSeverities = [
        'under-maintenance',
        'degraded-performance',
        'partial-outage',
        'major-outage'
      ]

      siteConfig.contentConfig.systems.forEach(system => {
        systems[system] = { severities: {} }

        systemSeverities.forEach(severities => {
          const condition = (incident, resolved) => {
            return incident.affectedsystems.includes(system) &&
              incident.severity === severities &&
              incident.resolved === resolved
          }
          const resolved = incidents[lang].filter(
            incident => condition(incident, true)
          ).length
          const unresolved = incidents[lang].filter(
            incident => condition(incident, false)
          ).length

          systems[system].severities[severities] = {
            resolved,
            unresolved
          }
        })
      })

      return systems
    }
  }
}
