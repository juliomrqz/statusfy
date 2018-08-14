export default class API {
  constructor (axios, lang) {
    this.axios = axios
    this.lang = lang
    this.isStatic = process.static
    this.basePath = '/api/v1'
  }

  buildUrl (path) {
    let finalPath = this.isStatic ? '/static/content' : ''
    finalPath += this.basePath + path
    finalPath += this.isStatic ? `.${this.lang}.json` : ''

    return finalPath
  }

  async getAllSystems () {
    return this.axios.$get(this.buildUrl('/systems'))
  }

  async getAllIncidents () {
    return this.axios.$get(this.buildUrl('/incidents'))
  }
}
