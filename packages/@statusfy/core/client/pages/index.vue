<template>
  <section class="container">
    <!-- System Status -->
    <system-status :systems="systems" />

    <!-- Scheduled -->
    <scheduled :data="scheduled" />

    <!-- Timeline -->
    <incidents-timeline :data="timelineData" />
  </section>
</template>

<script>
import API from '~/helpers/api'
import IncidentsTimeline from '~/components/IncidentsTimeline'
import SystemStatus from '~/components/SystemStatus'
import Scheduled from '~/components/Scheduled'

export default {
  layout: 'home',
  components: {
    IncidentsTimeline,
    SystemStatus,
    Scheduled
  },
  async asyncData ({ app }) {
    const api = new API(app.$axios, app.i18n.locale)

    const systems = await api.getSystems()
    const timelineData = await api.getIncidentsTimeline()
    const scheduled = await api.getScheduled()

    return { systems, timelineData, scheduled }
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
