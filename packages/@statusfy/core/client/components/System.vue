<template>
  <div
    :class="system.status"
    class="system flex flex-row justify-between">
    <div class="system-title flex-1">
      {{ $t(`systems.items.${system.name}.title`) }}

      <v-popover
        v-if="description"
        trigger="hover focus"
        placement="top"
        popover-class="popover"
        class="hidden sm:inline">
        <span class="system-title-info">
          <svgicon
            name="fortawesome/question-circle-regular"
            class="svg-inline--fa fa-w-16"/>
        </span>

        <template slot="popover">{{ description }}</template>
      </v-popover>
    </div>
    <div class="system-status flex-1">
      <span class="hidden sm:inline">{{ status.title }}</span>
      <svgicon
        :name="`fortawesome/${status.icon}-solid`"
        class="svg-inline--fa fa-w-16"/>
    </div>
  </div>
</template>

<script>
import { getStatusInfo } from '~/helpers/statuses'

import '~/components/icons/fortawesome/question-circle-regular'
import '~/components/icons/fortawesome/clock-solid'
import '~/components/icons/fortawesome/exclamation-circle-solid'
import '~/components/icons/fortawesome/minus-circle-solid'
import '~/components/icons/fortawesome/times-circle-solid'
import '~/components/icons/fortawesome/check-circle-solid'

export default {
  components: {
    'v-popover': () => import('v-tooltip').then(({ VPopover }) => VPopover)
  },
  props: {
    system: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      const $t = this.$t.bind(this)
      const $te = this.$te.bind(this)
      const key = `systems.items.${this.system.name}.description`

      if ($te(key)) {
        return $t(key)
      } else {
        return null
      }
    },
    status () {
      const $t = this.$t.bind(this)

      return getStatusInfo($t, this.system.status)
    }
  }
}
</script>
