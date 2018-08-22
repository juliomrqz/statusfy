<template>
  <div>
    <div class="text-center">
      <h1 class="font-medium mb-5">{{ incident.title }}</h1>
    </div>

    <incident
      :key="incident.id"
      :incident="incident"
      :level="0" />

    <div class="flex flex-col sm:flex-row items-center justify-between sm:pt-2 pt-4">
      <div class="text-center">
        <nuxt-link
          :to="localePath('history')"
          class="inline-block bg-white rounded-full font-medium border py-2 px-4 mb-4 shadow">
          {{ $t('incidents.incidents-history') }}
        </nuxt-link>
      </div>
      <div class="text-center">
        <nuxt-link
          :to="localePath('index')"
          class="inline-block bg-white rounded-full font-medium border py-2 px-4 mb-4 shadow">
          {{ $t('incidents.current-status') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import API from '~/helpers/api'
import Incident from '~/components/Incident'
import { getStatusInfo } from '~/helpers/statuses'

export default {
  components: {
    Incident
  },
  async asyncData ({ app, params }) {
    const api = new API(app.$axios, app.i18n.locale)
    const incident = await api.getIncident(params.id)

    return {
      incident
    }
  },
  head () {
    const $t = this.$t.bind(this)
    let description = this.incident.description

    if (!description) {
      const ressolvedStatus = this.incident.resolved ? $t('incidents.resolved') : $t('incidents.unresolved')
      const severity = getStatusInfo($t, this.incident.severity).title

      description = `[${ressolvedStatus}] ${$t('incidents.incident')} #${this.incident.id}: ${this.incident.title} - ${severity}`
    }

    return {
      title: `${$t('incidents.incident')}: ${this.incident.title}`,
      meta: [
        { hid: 'description', name: 'description', content: description }
      ]
    }
  },
  validate ({ params }) {
    // Must be alphanumeric
    return /^[a-z0-9]+$/i.test(params.id)
  }
}
</script>
