<template>
  <div class="incidents-container">
    <div
      v-for="period of periods"
      :key="period.date"
      class="incidents-period">

      <div>
        <h2 class="incidents-period-title">
          <nice-date
            :date="period.id"
            format="month" />
        </h2>

        <div
          v-if="period.incidents.length === 0"
          class="incidents-message">
          {{ $t('incidents.no-incidents') }}
        </div>

        <incidents-collapse :incidents="period.incidents" />
      </div>
    </div>
  </div>
</template>

<script>
import IncidentsCollapse from './IncidentsCollapse'
import NiceDate from '~/components/NiceDate'

export default {
  components: {
    IncidentsCollapse,
    NiceDate
  },
  props: {
    periods: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.incidents-container {
  @apply my-4;
}

.incidents-period {
  @apply py-4 relative;
}

.incidents-period-title {
  @apply text-xl pt-1 font-medium mb-4;
}

.incidents-message {
  color: var(--grey-darker);
}
</style>
