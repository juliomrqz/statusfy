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
  layout: 'home',
  components: {
    IncidentsTimeline,
    SystemStatus
  },
  async asyncData ({ app }) {
    const api = new API(app.$axios, app.i18n.locale)

    const systems = await api.getSystems()
    const timelineData = await api.getIncidentsTimeline()

    return { systems, timelineData }
  },
  head () {
    const $t = this.$t.bind(this)

    return {
      title: $t('incidents.current-status'),
      meta: [
        { hid: 'description', name: 'description', content: $t('incidents.current-status-description') }
      ]
    }
  }
}
</script>
