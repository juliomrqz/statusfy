<template>
  <div class="flex p-4 m-2 bg-grey-lighter block rounded">
    <div class="flex-1 text-grey-darker">
      {{ $t(`systems.items.${system.name}.title`) }}

      <v-popover
        v-if="description"
        trigger="hover focus"
        placement="top"
        popover-class="absolute bg-grey-darkest text-white rounded px-4 py-3 shadow m-1 max-w-xs text-center text-sm"
        class="hidden sm:inline">
        <span class="cursor-pointer text-grey-dark">
          <font-awesome-icon :icon="['far', 'question-circle']" />
        </span>

        <template slot="popover">{{ description }}</template>
      </v-popover>
    </div>
    <div class="flex-1 text-grey-darker text-right">
      <span :class="`text-${status.color}`">
        <span class="hidden sm:inline">{{ status.title }}</span>
        <font-awesome-icon :icon="status.icon" />
      </span>
    </div>
  </div>
</template>

<script>
import Statuses from '~/helpers/statuses'

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
      const key = `systems.items.${this.system.name}.description`
      const result = $t(key)

      if (result !== key) {
        return result
      } else {
        return null
      }
    },
    status () {
      const $t = this.$t.bind(this)
      const statuses = Statuses($t)

      return {
        title: statuses.i18nKeys[this.system.status],
        color: statuses.colors[this.system.status],
        icon: statuses.icons[this.system.status]
      }
    }
  }
}
</script>
