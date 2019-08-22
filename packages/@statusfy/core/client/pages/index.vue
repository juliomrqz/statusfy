<template>
  <section class="container">
    <!-- Scheduled: Below the Global Status -->
    <scheduled
      v-if="$statusfy.theme.scheduled.position === 'aboveGlobalStatus'"
      :data="scheduled"
    />

    <!-- Global Status -->
    <div :class="status.key" class="global-status flex justify-center">
      <span>{{ status.title }}</span>
      <span class="global-status-icon">
        <svgicon
          :name="`fortawesome/${status.icon}`"
          class="svg-inline--fa fa-w-16"
        />
      </span>
    </div>

    <!-- Scheduled: Above the Systems -->
    <scheduled
      v-if="$statusfy.theme.scheduled.position === 'aboveSystems'"
      :data="scheduled"
    />

    <!-- System Status -->
    <system-status :systems="systems" />

    <!-- Scheduled: Below the Systems -->
    <scheduled
      v-if="$statusfy.theme.scheduled.position === 'belowSystems'"
      :data="scheduled"
    />

    <!-- Timeline -->
    <incidents-timeline :data="timelineData" />
  </section>
</template>

<script>
import { statusesInfo } from "~/helpers/statuses";
import API from "~/helpers/api";

import IncidentsTimeline from "~/components/IncidentsTimeline";
import SystemStatus from "~/components/SystemStatus";
import Scheduled from "~/components/Scheduled";

import "~/components/icons/fortawesome/clock-solid";
import "~/components/icons/fortawesome/exclamation-circle-solid";
import "~/components/icons/fortawesome/minus-circle-solid";
import "~/components/icons/fortawesome/times-circle-solid";
import "~/components/icons/fortawesome/check-circle-solid";

export default {
  layout: "home",
  components: {
    IncidentsTimeline,
    SystemStatus,
    Scheduled
  },
  computed: {
    status() {
      const $t = this.$t.bind(this);
      const statuses = statusesInfo($t);

      let statusKey = "operational";

      // eslint-disable-next-line no-unused-vars
      for (const status of statuses.keys) {
        if (this.systems.find(system => system.status === status)) {
          statusKey = status;
          break;
        }
      }

      return {
        title: statuses.i18nKeys[statusKey],
        icon: statuses.icons[statusKey],
        key: statusKey
      };
    }
  },
  async asyncData({ app }) {
    const api = new API(app.$axios, app.i18n.locale);

    const systems = await api.getSystems();
    const timelineData = await api.getIncidentsTimeline();
    const scheduled = await api.getScheduled();

    return { systems, timelineData, scheduled };
  },
  head() {
    const $t = this.$t.bind(this);

    return {
      title: $t("incidents.current-status"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: $t("incidents.current-status-description")
        }
      ]
    };
  }
};
</script>
