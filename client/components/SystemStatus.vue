<template>
  <div>
    <div
      :class="`bg-${status.color}`"
      class="flex justify-center content-center py-4 px-2 text-white shadow rounded my-4 text-2xl">
      <span>{{ status.title }}</span>
      <span class="ml-2"><font-awesome-icon :icon="status.icon"/></span>
    </div>
    <div class="flex flex-col py-2 px-2 bg-white shadow rounded my-4">
      <system
        v-for="system in systems"
        :key="system.name"
        :system="system" />
    </div>
  </div>
</template>

<script>
import System from '~/components/System'
import Statuses from '~/helpers/statuses'

export default {
  components: {
    System
  },
  props: {
    systems: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  computed: {
    status () {
      const $t = this.$t.bind(this)
      const statuses = Statuses($t)

      let statusKey = 'operational'

      for (let status of statuses.keys) {
        if (this.systems.find(system => system.status === status)) {
          statusKey = status
          break
        }
      }

      return {
        title: statuses.i18nKeys[statusKey],
        color: statuses.colors[statusKey],
        icon: statuses.icons[statusKey]
      }
    }
  }
}
</script>
