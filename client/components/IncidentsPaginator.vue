<template>
  <div
    v-if="info.totalPages > 1"
    class="text-center p-4">
    <nuxt-link
      v-if="info.page !== 1"
      :to="previousLink"
      class="inline-block bg-white rounded-full font-medium border py-2 px-4 mx-2 shadow">
      <font-awesome-icon
        :icon="'chevron-left'"
        class="mr-1" />
      {{ $t('incidents.paginator.previous') }}
    </nuxt-link>

    <nuxt-link
      v-if="info.page !== info.totalPages"
      :to="localePath({ name: 'history-page', params: { page: info.page + 1 } })"
      class="inline-block bg-white rounded-full font-medium border py-2 px-4 mx-2 shadow">
      {{ $t('incidents.paginator.next') }}
      <font-awesome-icon
        :icon="'chevron-right'"
        class="ml-1" />
    </nuxt-link>
  </div>
</template>

<script>
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
    previousLink () {
      if (this.info.page === 2) {
        return this.localePath('history')
      } else {
        return this.localePath({ name: 'history-page', params: { page: this.info.page - 1 } })
      }
    }
  }
}
</script>
