<template>
  <div>
    <incidents-history :periods="periods" />

    <incidents-paginator :info="pageInfo" />
  </div>
</template>

<script>
import API from '~/helpers/api'
import IncidentsPaginator from '~/components/IncidentsPaginator'
import IncidentsHistory from '~/components/IncidentsHistory'

export default {
  layout: 'incidents',
  components: {
    IncidentsHistory,
    IncidentsPaginator
  },
  async asyncData ({ app, params }) {
    const api = new API(app.$axios, app.i18n.locale)
    const history = await api.getIncidentsHistory(params.page)

    return {
      periods: history.periods,
      pageInfo: {
        page: history.page,
        pageSize: history.page_size,
        totalPages: history.total_pages
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
