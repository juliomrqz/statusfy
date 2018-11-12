export default class API {
  constructor (axios, lang) {
    this.axios = axios
    this.lang = lang
    this.isStatic = process.static
    this.basePath = '/api/v0'
  }

  buildUrl (path, queryStrings = {}) {
    const queryStringsKeys = Object.keys(queryStrings)

    let builtQueryStrings
    let finalPath = `${this.basePath}${path}`

    if (this.isStatic) {
      builtQueryStrings = queryStringsKeys.map(key => `${key}-${queryStrings[key]}`).join('.')

      finalPath = '/static/content' + finalPath
      finalPath += builtQueryStrings ? `.${builtQueryStrings}` : ''
      finalPath += `.${this.lang}.json`
    } else {
      let builtQueryStrings = queryStringsKeys.map(key => `${key}=${queryStrings[key]}`).join('&')

      finalPath += builtQueryStrings ? `?${builtQueryStrings}` : ''
    }

    return finalPath
  }

  async getSystems () {
    return this.axios.$get(this.buildUrl('/systems'))
  }

  async getIncidents (page = 1) {
    return this.axios.$get(this.buildUrl('/incidents', { page }))
  }

  async getIncident (id) {
    return this.axios.$get(this.buildUrl(`/incidents/${id}`))
  }

  async getIncidentsHistory (page = 1) {
    return this.axios.$get(this.buildUrl('/incidents/history', { page }))
  }

  async getIncidentsTimeline () {
    return this.axios.$get(this.buildUrl('/incidents/timeline'))
  }
}
