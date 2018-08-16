<template>
  <div>
    <incident
      v-for="incident in incidents"
      :key="incident.id"
      :incident="incident"
      :summary="true" />

    <incidents-paginator :info="pageInfo" />
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
  async asyncData ({ app }) {
    const api = new API(app.$axios, app.i18n.locale)
    const incidentsRes = await api.getAllIncidents()

    return {
      incidents: incidentsRes.incidents,
      pageInfo: {
        page: incidentsRes.page,
        pageSize: incidentsRes.page_size,
        totalPages: incidentsRes.total_pages
      }
    }
  }
}
</script>
