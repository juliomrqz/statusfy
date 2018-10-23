<template>
  <div>
    <div
      :class="status.key"
      class="global-status flex justify-center">
      <span>{{ status.title }}</span>
      <span class="global-status-icon">
        <svgicon
          :name="`fortawesome/${status.icon}-solid`"
          class="svg-inline--fa fa-w-16"/>
      </span>
    </div>
    <div class="systems-container flex flex-col">
      <system
        v-for="system in systems"
        :key="system.name"
        :system="system" />
    </div>
  </div>
</template>

<script>
import { statusesInfo } from '~/helpers/statuses'

import System from '~/components/System'
import '~/components/icons/fortawesome/clock-solid'
import '~/components/icons/fortawesome/exclamation-circle-solid'
import '~/components/icons/fortawesome/minus-circle-solid'
import '~/components/icons/fortawesome/times-circle-solid'
import '~/components/icons/fortawesome/check-circle-solid'

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
      const statuses = statusesInfo($t)

      let statusKey = 'operational'

      for (let status of statuses.keys) {
        if (this.systems.find(system => system.status === status)) {
          statusKey = status
          break
        }
      }

      return {
        title: statuses.i18nKeys[statusKey],
        icon: statuses.icons[statusKey],
        key: statusKey
      }
    }
  }
}
</script>
