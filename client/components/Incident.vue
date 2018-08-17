<template>
  <div class="incident p-4 pt-6 bg-white shadow rounded my-4">
    <div class="flex flex-col sm:flex-row items-center justify-between">
      <nuxt-link :to="localePath({ name: 'incidents-id', params: { id: incident.id } })">
        <span
          :class="`bg-${resolved.color}`"
          class="inline-block text-white rounded-full text-sm font-semibold py-1 p-3 mr-2">
          {{ resolved.value ? $t('incidents.resolved') : $t('incidents.unresolved') }}
        </span>
        <component
          :is="`h${level}`"
          :class="`text-${resolved.color}`"
          class="text-lg block mb-4 sm:mb-0 inline-block">
          {{ incident.title }}
        </component>
      </nuxt-link>

      <div class="mb-2 sm:mb-0">
        <span
          v-for="system of incident.affectedsystems"
          :key="system"
          class="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker py-1 p-3 ml-2">
          {{ $t(`systems.items.${system}.title`) }}
        </span>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between mt-2 mb-4">
      <div
        :class="`text-${status.color}`"
        class="mb-2 sm:mb-0">
        <font-awesome-icon :icon="status.icon" />
        {{ status.title }}
      </div>

      <div>
        <nice-date
          :date="incident.date"
          format="long" />
      </div>
    </div>

    <div
      v-if="summary"
      class="mt-4">
      <div v-if="incident.description">{{ incident.description }}</div>
    </div>

    <div
      v-else
      ref="content"
      class="incident-content mt-4"
      v-html="incident.content"/>
  </div>
</template>

<script>
import { getStatusInfo } from '~/helpers/statuses'
import NiceDate from '~/components/NiceDate'

export default {
  components: {
    NiceDate
  },
  props: {
    incident: {
      type: Object,
      required: true
    },
    summary: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 4,
      validator: (value) => {
        // The value must match one of these numbers
        return [1, 4].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    status () {
      const $t = this.$t.bind(this)
      return getStatusInfo($t, this.incident.severity)
    },
    resolved () {
      const $t = this.$t.bind(this)
      const statusKey = this.incident.resolved ? 'operational' : this.incident.severity

      return {
        value: this.incident.resolved,
        ...getStatusInfo($t, statusKey)
      }
    }
  },
  mounted () {
    const $t = this.$t.bind(this)

    if (this.$refs.content) {
      const blockElements = this.$refs.content.querySelectorAll('.update-block')

      blockElements.forEach((el, i) => {
        const dateEl = el.querySelectorAll('.update-block-date')[0]
        const date = this.$statusfy.dayjs(dateEl.innerHTML)

        dateEl.innerHTML = date.locale(this.$i18n.locale).format($t(`dates.formats.long`))
      })
    }
  }
}
</script>
