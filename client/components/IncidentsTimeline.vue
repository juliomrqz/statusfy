<template>
  <div class="mt-6">
    <h2 class="text-2xl mb-2 font-medium">{{ $t('incidents.latest-incidents') }}</h2>

    <ul class="timeline relative list-reset my-4">
      <li
        v-for="day of days"
        :key="day.date"
        class="relative">

        <label
          :class="`border-${day.status.color}`"
          class="m-2 ml-0 mt-1 absolute w-5 h-5 rounded-full bg-white border-2"/>

        <div class="pl-8 pb-8 ml-4 relative">
          <h3 class="text-xl pt-1 font-medium mb-4">
            <nice-date :date="day.date" />
          </h3>

          <div
            v-if="day.incidents.length === 0"
            class="text-grey-darker">
            {{ $t('incidents.no-incidents') }}
          </div>

          <incident
            v-for="incident in day.incidents"
            :key="incident.id"
            :incident="incident" />
        </div>
      </li>
    </ul>

    <div class="text-center">
      <nuxt-link
        :to="localePath('history')"
        class="inline-block bg-white rounded-full font-semibold border py-2 px-4 shadow">
        {{ $t('incidents.incidents-history') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Statuses from '~/helpers/statuses'
import Incident from './Incident'
import NiceDate from '~/components/NiceDate'

export default {
  components: {
    Incident,
    NiceDate
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    days () {
      const days = this.data.days.slice(0)

      for (let day of days) {
        day.status = this.getDayStatus(day.incidents)
      }

      return days
    }
  },
  methods: {
    getDayStatus (incidents) {
      const $t = this.$t.bind(this)
      const statuses = Statuses($t)

      let statusKey = 'operational'

      for (let status of statuses.keys) {
        for (let incident of incidents) {
          if (incident.severity === status) {
            statusKey = status
            break
          }
        }
      }

      return {
        title: statuses.i18nKeys[statusKey],
        color: statusKey === 'operational' ? 'grey-light' : statuses.colors[statusKey],
        icon: statuses.icons[statusKey]
      }
    }
  }
}
</script>
