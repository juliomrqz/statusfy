<template>
  <div>
    <ul
      :class="{'collapse' : collapsed && incidents.length > 3 }"
      class="list-reset">
      <li
        v-for="incident in incidents"
        :key="incident.id">
        <incident
          :incident="incident"
          :summary="true"
          :level="3" />
      </li>

      <div
        v-if="incidents.length > 3"
        class="incident py-2 px-4 bg-white shadow rounded-full my-4 text-center cursor-pointer"
        @click="collapsed = !collapsed">
        <template v-if="collapsed">+ {{ $t('incidents.collapse.show', { count: incidents.length }) }}</template>
        <template v-else>- {{ $t('incidents.collapse.hide') }}</template>
      </div>
    </ul>
  </div>
</template>

<script>
import Incident from './Incident'

export default {
  components: {
    Incident
  },
  props: {
    incidents: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    collapsed: true
  })
}
</script>

<style scoped>
.collapse li:nth-child(n + 4) {
  display: none;
}
</style>
