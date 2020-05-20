<template>
  <div :class="system.status" class="system flex flex-row justify-between">
    <div class="system-title">
      {{ $t(`systems.items.${system.name}.title`) }}

      <v-popover
        v-if="description"
        trigger="hover focus"
        placement="top"
        popover-class="popover"
        class="hidden sm:inline"
      >
        <span class="system-title-info">
          <svgicon
            name="fortawesome/question-circle-regular"
            class="ml-1 svg-inline--fa fa-w-16"
          />
        </span>

        <template slot="popover">
          {{ description }}
        </template>
      </v-popover>
    </div>
    <div class="system-status">
      <span class="hidden sm:inline">{{ status.title }}</span>
      <svgicon
        :name="`fortawesome/${status.icon}`"
        class="svg-inline--fa fa-w-16"
      />
    </div>
  </div>
</template>

<script>
import { getStatusInfo } from "~/helpers/statuses";

import "./icons/fortawesome/question-circle-regular";

import "./icons/fortawesome/clock-solid";
import "./icons/fortawesome/exclamation-circle-solid";
import "./icons/fortawesome/minus-circle-solid";
import "./icons/fortawesome/times-circle-solid";
import "./icons/fortawesome/check-circle-solid";

export default {
  components: {
    "v-popover": () => import("v-tooltip").then(({ VPopover }) => VPopover)
  },
  props: {
    system: {
      type: Object,
      required: true
    }
  },
  computed: {
    description() {
      const $t = this.$t.bind(this);
      const $te = this.$te.bind(this);
      const key = `systems.items.${this.system.name}.description`;

      if ($te(key)) {
        return $t(key);
      } else {
        return null;
      }
    },
    status() {
      const $t = this.$t.bind(this);

      return getStatusInfo($t, this.system.status);
    }
  }
};
</script>
