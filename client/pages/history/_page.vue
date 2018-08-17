<template>
  <div>
    <incident
      v-for="incident in incidents"
      :key="incident.id"
      :incident="incident"
      :summary="true" />

    <incidents-paginator
      :info="pageInfo"
      :summary="true" />
  </div>
</template>

<script>
import API from '~/helpers/api'
import Incident from '~/components/Incident'
import IncidentsPaginator from '~/components/IncidentsPaginator'

export default {
  layout: 'incidents',
  components: {
    Incident,
    IncidentsPaginator
  },
  async asyncData ({ app, params }) {
    const api = new API(app.$axios, app.i18n.locale)
    const incidentsRes = await api.getIncidents(params.page)

    return {
      incidents: incidentsRes.incidents,
      pageInfo: {
        page: incidentsRes.page,
        pageSize: incidentsRes.page_size,
        totalPages: incidentsRes.total_pages
      }
    }
  },
  head () {
    const $t = this.$t.bind(this)

    return {
      title: `${$t('incidents.incidents-history')} - ${$t('incidents.paginator.page')} ${this.pageInfo.page}`,
      meta: [
        { hid: 'description', name: 'description', content: $t('incidents.incidents-history-description') }
      ]
    }
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.page)
  }
}
</script>
