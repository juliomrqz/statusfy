export default class API {
  constructor(axios, lang) {
    this.axios = axios;
    this.lang = lang;
    this.isStatic = process.static;
    this.basePath = "/api/v0";
  }

  buildUrl(path, queryStrings = {}) {
    const queryStringsKeys = Object.keys(queryStrings);

    let builtQueryStrings;
    let finalPath = `${this.basePath}${path}`;

    if (this.isStatic) {
      builtQueryStrings = queryStringsKeys
        .map(key => `${key}-${queryStrings[key]}`)
        .join(".");

      finalPath = "/static/content" + finalPath;
      finalPath += builtQueryStrings ? `.${builtQueryStrings}` : "";
      finalPath += `.${this.lang}.json`;
    } else {
      const builtQueryStrings = queryStringsKeys
        .map(key => `${key}=${queryStrings[key]}`)
        .join("&");

      finalPath += builtQueryStrings ? `?${builtQueryStrings}` : "";
    }

    return finalPath;
  }

  async getSystems() {
    const systems = await this.axios.$get(this.buildUrl("/systems"));
    return systems;
  }

  async getIncidents(page = 1) {
    const incidents = await this.axios.$get(
      this.buildUrl("/incidents", { page })
    );
    return incidents;
  }

  async getIncident(id) {
    const incident = await this.axios.$get(this.buildUrl(`/incidents/${id}`));
    return incident;
  }

  async getIncidentsHistory(page = 1) {
    const incidentsHistory = await this.axios.$get(
      this.buildUrl("/incidents/history", { page })
    );
    return incidentsHistory;
  }

  async getIncidentsTimeline() {
    const incidentsTimeline = await this.axios.$get(
      this.buildUrl("/incidents/timeline")
    );
    return incidentsTimeline;
  }

  async getScheduled() {
    const scheduled = await this.axios.$get(this.buildUrl("/scheduled"));
    return scheduled;
  }
}
