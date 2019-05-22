<template>
  <div>
    <div v-if="count > 0">
      <incidents-history :periods="periods" />

      <incidents-paginator :info="pageInfo" />
    </div>

    <div v-else class="text-center">
      <h2>{{ $t("incidents.no-incidents") }}</h2>
    </div>
  </div>
</template>

<script>
import API from "~/helpers/api";
import IncidentsPaginator from "~/components/IncidentsPaginator";
import IncidentsHistory from "~/components/IncidentsHistory";

export default {
  layout: "incidents",
  components: {
    IncidentsHistory,
    IncidentsPaginator
  },
  async asyncData({ app }) {
    const api = new API(app.$axios, app.i18n.locale);
    const history = await api.getIncidentsHistory();

    return {
      count: history.count,
      periods: history.periods,
      pageInfo: {
        page: history.page,
        pageSize: history.page_size,
        totalPages: history.total_pages
      }
    };
  },
  head() {
    const $t = this.$t.bind(this);

    return {
      title: $t("incidents.incidents-history"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: $t("incidents.incidents-history-description")
        }
      ]
    };
  }
};
</script>
