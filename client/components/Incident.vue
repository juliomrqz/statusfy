<template>
  <div class="incident p-4 pt-6 bg-white shadow rounded my-4">
    <div class="flex flex-col sm:flex-row items-center justify-between">
      <h4
        :class="`text-${resolved.color}`"
        class="text-lg block mb-4 sm:mb-0">
        [{{ resolved.value ? $t('incidents.resolved') : $t('incidents.unresolved') }}]
        {{ incident.title }}
      </h4>

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
        class="mb-2 sm:mb-0">{{ status.title }}</div>

      <div>
        <nice-date
          :date="incident.date"
          format="long" />
      </div>
    </div>

    <div
      ref="content"
      class="incident-content mt-4"
      v-html="incident.content"/>
  </div>
</template>

<script>
import Statuses from '~/helpers/statuses'
import NiceDate from '~/components/NiceDate'

export default {
  components: {
    NiceDate
  },
  props: {
    incident: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    status () {
      return this.getStatusInfo(this.incident.severity)
    },
    resolved () {
      const statusKey = this.incident.resolved ? 'operational' : this.incident.severity

      return {
        value: this.incident.resolved,
        ...this.getStatusInfo(statusKey)
      }
    }
  },
  mounted () {
    const $t = this.$t.bind(this)
    const blockElements = this.$refs.content.querySelectorAll('.update-block')

    blockElements.forEach((el, i) => {
      const dateEl = el.querySelectorAll('.update-block-date')[0]
      const date = this.$statusfy.dayjs(dateEl.innerHTML)

      dateEl.innerHTML = date.locale(this.$i18n.locale).format($t(`dates.formats.long`))
    })
  },
  methods: {
    getStatusInfo (status) {
      const $t = this.$t.bind(this)
      const statuses = Statuses($t)

      return {
        title: statuses.i18nKeys[status],
        color: statuses.colors[status],
        icon: statuses.icons[status]
      }
    }
  }
}
</script>
