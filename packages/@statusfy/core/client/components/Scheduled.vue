<template>
  <div
    v-if="data && data.count > 0"
    class="scheduled-container"
  >
    <h2>{{ $t('incidents.scheduled') }}</h2>

    <div class="incidents-container">
      <ul class="list-reset">
        <li
          v-for="incident in data.incidents"
          :key="incident.id"
        >
          <incident
            :incident="incident"
            :summary="true"
            :scheduled="true"
            :level="3"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Incident from "./Incident";

export default {
  components: {
    Incident
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
