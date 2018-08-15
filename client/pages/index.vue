<template>
  <section class="container">
    <!-- System Status -->
    <system-status :systems="systems" />

    <!-- Timeline -->
    <incidents-timeline :data="timelineData" />
  </section>
</template>

<script>
import API from '~/helpers/api'
import IncidentsTimeline from '~/components/IncidentsTimeline'
import SystemStatus from '~/components/SystemStatus'

export default {
  components: {
    IncidentsTimeline,
    SystemStatus
  },
  async asyncData ({ app }) {
    const api = new API(app.$axios, app.i18n.locale)

    const systems = await api.getAllSystems()
    const timelineData = await api.allIncidentsTimeline()

    return { systems, timelineData }
  }
}
</script>
