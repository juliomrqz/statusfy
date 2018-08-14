const { readdir, stat, readFile } = require('fs')
const { promisify } = require('util')
const path = require('path')
const hash = require('hash-sum')
const LRU = require('lru-cache')
const spawn = require('cross-spawn')
const sortBy = require('lodash/sortBy')
const drop = require('lodash/drop')
const Moment = require('moment')
const MomentRange = require('moment-range')

const createMarkdown = require('../markdown')

const moment = MomentRange.extendMoment(Moment)
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

const readFileIncidents = async (dirPath) => {
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
        try {
          incident.modified = new Date(getGitLastUpdatedTimeStamp(filePath)).toISOString()
        } catch (error) {
          incident.modified = null
        }
      }

      allIncidents.push(incident)
    }
  }

  return allIncidents
}

const getIncidents = async (siteConfig) => {
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

      localeIncidents = await readFileIncidents(contentPath)
    }

    incidents[locale.code] = localeIncidents
    cache.set(cacheKey, localeIncidents)
  }

  return incidents
}

const getPaginatedItems = (items, page = 1, pageSize = 10) => {
  // Based on https://gist.github.com/jstott/7b50d4f4790c357227bafd13b4ef32a4
  const offset = (page - 1) * pageSize
  const pagedItems = drop(items, offset).slice(0, pageSize)

  return {
    page,
    pageSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pageSize),
    data: pagedItems
  }
}

module.exports = async function database (siteConfig) {
  const incidents = await getIncidents(siteConfig)
  const sortIncidents = (incidents) => sortBy(incidents, o => -Number(new Date(o.date)))

  return {
    allIncidents (lang, page = 1, pageSize = 3) {
      const sortedIncidents = sortIncidents(incidents[lang])
      const paginatedIncidents = getPaginatedItems(sortedIncidents, page, pageSize)

      return {
        count: sortedIncidents.length,
        page: paginatedIncidents.page,
        page_size: paginatedIncidents.pageSize,
        total_pages: paginatedIncidents.totalPages,
        incidents: paginatedIncidents.data
      }
    },
    allIncidentsTimeline (lang, daysNumber = 7) {
      const sortedIncidents = sortIncidents(incidents[lang])
      // Beginning of today
      const end = moment().millisecond(0).second(0).minutes(0).hours(0)
      // {daysNumber} days ago from today
      const start = moment(end).subtract(daysNumber, 'days')
      const range = moment.range(start, end)
      const rangeDays = Array.from(range.by('day', {excludeStart: true})).reverse()
      const days = []

      // Get incidents for each day in the range
      let order = 1
      for (let day of rangeDays) {
        const incidents = []

        for (let incident of sortedIncidents) {
          const incidentDate = moment(incident.date)
          const difference = Math.abs(day.diff(incidentDate, 'hours'))

          // If difference is less that 24 hours, include incident
          // in the selected day
          if (difference <= 24) {
            incidents.push(incident)
          } else if (difference <= 24 * 2) {
            // if difference is more than 2 days, it's not worthy
            // to keep looking for other incidets
            break
          }
        }

        days.push({
          date: day,
          count: incidents.length,
          incidents,
          order
        })

        order++
      }

      return {
        count: days.length,
        days
      }
    },
    getIncident (id, lang) {
      return incidents[lang].filter(i => i.id === id)[0]
    },
    allSystems (lang) {
      const systems = []
      // Important order of relevance
      const systemSeverities = [
        'under-maintenance',
        'major-outage',
        'partial-outage',
        'degraded-performance'
      ]
      let order = 1

      siteConfig.contentConfig.systems.forEach(system => {
        const currentSystem = { name: system, status: 'operational', order }

        for (let severity of systemSeverities) {
          const unresolved = incidents[lang].filter(
            incident => incident.affectedsystems.includes(system) &&
            incident.severity === severity &&
            incident.resolved === false
          ).length

          if (unresolved > 0) {
            currentSystem['status'] = severity
            break
          }
        }

        systems.push(currentSystem)
        order++
      })

      return systems
    }
  }
}
