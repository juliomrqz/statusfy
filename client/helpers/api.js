export default class API {
  constructor (axios, lang) {
    this.axios = axios
    this.lang = lang
    this.isStatic = process.static
    this.basePath = '/api/v1'
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

  async getAllSystems () {
    return this.axios.$get(this.buildUrl('/systems'))
  }

  async getAllIncidents (page = 1) {
    return this.axios.$get(this.buildUrl('/incidents', { page }))
  }

  async allIncidentsTimeline () {
    return this.axios.$get(this.buildUrl('/incidents/timeline'))
  }
}
