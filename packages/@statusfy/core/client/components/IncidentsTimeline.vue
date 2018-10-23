<template>
  <div class="timeline-container">
    <h2>{{ $t('incidents.latest-incidents') }}</h2>

    <ul class="timeline">
      <li
        v-for="day of days"
        :key="day.date"
        :class="day.status.key"
        class="timeline-incident">

        <h3 class="timeline-incident-title">
          <nice-date :date="day.date" />
        </h3>

        <div class="timeline-incident-body">
          <div
            v-if="day.incidents.length === 0"
            class="message">
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
        class="btn mb-4">
        {{ $t('incidents.incidents-history') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { statusesInfo } from '~/helpers/statuses'
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
      const statuses = statusesInfo($t)

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
        key: statusKey,
        title: statuses.i18nKeys[statusKey],
        icon: statuses.icons[statusKey]
      }
    }
  }
}
</script>
