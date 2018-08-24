<template>
  <div class="my-4">
    <div
      v-for="period of periods"
      :key="period.date">

      <div class="py-4 relative">
        <h2 class="text-xl pt-1 font-medium mb-4">
          <nice-date
            :date="period.id"
            format="month" />
        </h2>

        <div
          v-if="period.incidents.length === 0"
          class="text-grey-darker">
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
