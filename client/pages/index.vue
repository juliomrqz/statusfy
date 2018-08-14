<template>
  <section class="container">
    <system-status :systems="systems" />
    <!--  -->
    <h2 class="text-2xl">Incidents</h2>
    <incident
      v-for="incident in incidents"
      :key="incident.id"
      :incident="incident" />
  </section>
</template>

<script>
import API from '~/helpers/api'
import Incident from '~/components/Incident'
import SystemStatus from '~/components/SystemStatus'

export default {
  components: {
    Incident,
    SystemStatus
  },
  async asyncData ({ app }) {
    const api = new API(app.$axios, app.i18n.locale)

    const systems = await api.getAllSystems()
    const incidents = (await api.getAllIncidents()).incidents

    return { systems, incidents }
  }
}
</script>
