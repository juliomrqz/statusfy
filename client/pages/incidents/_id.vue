<template>
  <div>
    <div class="flex flex-col sm:flex-row items-center justify-between">
      <div class="text-center">
        <nuxt-link
          :to="localePath('history')"
          class="inline-block bg-white rounded-full font-medium border py-2 px-4 shadow">
          {{ $t('incidents.incidents-history') }}
        </nuxt-link>
      </div>
      <div class="text-center">
        <nuxt-link
          :to="localePath('index')"
          class="inline-block bg-white rounded-full font-medium border py-2 px-4 shadow">
          {{ $t('incidents.current-status') }}
        </nuxt-link>
      </div>
    </div>

    <incident
      :key="incident.id"
      :incident="incident"
      :level="1" />
  </div>
</template>

<script>
import API from '~/helpers/api'
import Incident from '~/components/Incident'

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
  validate ({ params }) {
    // Must be alphanumeric
    return /^[a-z0-9]+$/i.test(params.id)
  }
}
</script>
