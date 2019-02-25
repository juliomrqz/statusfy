<template>
  <div
    v-if="info.totalPages > 1"
    class="text-center pb-4 mb-2"
  >
    <nuxt-link
      v-if="info.page !== 1"
      :to="previousLink"
      class="btn mx-2"
    >
      <svgicon
        name="fortawesome/chevron-left-solid"
        class="svg-inline--fa fa-w-16 mr-1"
      />
      {{ $t('incidents.paginator.previous') }}
    </nuxt-link>

    <nuxt-link
      v-if="info.page !== info.totalPages"
      :to="localePath({ name: 'history-page', params: { page: info.page + 1 } })"
      class="btn mx-2"
    >
      {{ $t('incidents.paginator.next') }}
      <svgicon
        name="fortawesome/chevron-right-solid"
        class="svg-inline--fa fa-w-16 mr-1"
      />
    </nuxt-link>
  </div>
</template>

<script>
import "./icons/fortawesome/chevron-right-solid";
import "./icons/fortawesome/chevron-left-solid";

export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => ({
        page: 1,
        pageSize: 10,
        totalPages: 1
      })
    }
  },
  computed: {
    previousLink() {
      if (this.info.page === 2) {
        return this.localePath("history");
      } else {
        return this.localePath({
          name: "history-page",
          params: { page: this.info.page - 1 }
        });
      }
    }
  }
};
</script>
