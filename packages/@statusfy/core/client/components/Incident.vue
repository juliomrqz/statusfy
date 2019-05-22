<template>
  <div
    :class="
      `${incident.severity}${resolved.value ? ' resolved' : ' unresolved'}${
        incident.scheduled ? ' scheduled' : ''
      }`
    "
    class="incident"
  >
    <div :class="`level-${level}`" class="incident-header">
      <div v-if="!incident.scheduled" class="incident-title">
        <span class="badge">
          {{
            resolved.value
              ? $t("incidents.resolved")
              : $t("incidents.unresolved")
          }}
        </span>
        <nuxt-link
          v-if="level > 0"
          :to="
            localePath({ name: 'incidents-id', params: { id: incident.id } })
          "
        >
          <component :is="`h${level}`">
            {{ incident.title }}
          </component>
        </nuxt-link>
      </div>
      <div v-else class="incident-title">
        <template>
          <component :is="`h${level}`">
            {{ incident.title }}
          </component>
        </template>
      </div>

      <div class="incident-systems">
        <span
          v-for="system of incident.affectedsystems"
          :key="system"
          class="badge"
        >
          {{ $t(`systems.items.${system}.title`) }}
        </span>
      </div>
    </div>

    <div class="incident-subtitle">
      <div v-if="!incident.scheduled" class="status">
        <svgicon
          :name="`fortawesome/${status.icon}`"
          class="svg-inline--fa fa-w-16"
        />
        {{ status.title }}
      </div>

      <div v-if="!incident.scheduled">
        <nice-date :date="incident.date" format="long" />
      </div>
      <div v-else>
        <nice-date
          :date="incident.scheduled"
          :include-u-t-c="false"
          format="long"
        />
        &nbsp;-&nbsp;
        <nice-date
          :date="getScheduledEndDate()"
          :include-u-t-c="false"
          format="long"
        />
        (UTC)
      </div>
    </div>

    <div class="incident-body">
      <div v-if="summary">
        <div v-if="incident.description">
          {{ incident.description }}
        </div>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div v-else ref="content" class="markdown" v-html="incident.content" />
      <!-- eslint-enable -->
    </div>

    <div class="hidden">
      <svgicon
        ref="external-link-icon"
        name="fortawesome/external-link-alt-solid"
        class="svg-inline--fa fa-w-12 ml-1"
      />
    </div>
  </div>
</template>

<script>
import { getStatusInfo } from "~/helpers/statuses";

import "./icons/fortawesome/clock-solid";
import "./icons/fortawesome/exclamation-circle-solid";
import "./icons/fortawesome/minus-circle-solid";
import "./icons/fortawesome/times-circle-solid";
import "./icons/fortawesome/check-circle-solid";
import "./icons/fortawesome/external-link-alt-solid";
import NiceDate from "./NiceDate";

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
    scheduled: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 4,
      validator: value => {
        // The value must match one of these numbers
        return [0, 3, 4].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    status() {
      const $t = this.$t.bind(this);
      return getStatusInfo($t, this.incident.severity);
    },
    resolved() {
      const $t = this.$t.bind(this);
      const statusKey = this.incident.resolved
        ? "operational"
        : this.incident.severity;

      return {
        value: this.incident.resolved,
        ...getStatusInfo($t, statusKey)
      };
    }
  },
  mounted() {
    const $t = this.$t.bind(this);

    if (this.$refs.content) {
      const blockElements = this.$refs.content.querySelectorAll(
        ".update-block"
      );
      const externalLinksElements = this.$refs.content.querySelectorAll(
        "a.external"
      );
      const iconElement = this.$refs["external-link-icon"].$el;

      blockElements.forEach((el, i) => {
        const dateEl = el.querySelectorAll(".update-block-date")[0];
        const date = this.$statusfy.dates.parse(dateEl.innerHTML);

        dateEl.innerHTML = this.$statusfy.dates.format(
          date,
          $t(`dates.formats.long`),
          this.$i18n.locale
        );
      });

      externalLinksElements.forEach((el, i) => {
        el.appendChild(iconElement);
      });
    }
  },
  methods: {
    getScheduledEndDate() {
      return this.$statusfy.dates
        .parse(this.incident.scheduled)
        .add(this.incident.duration, "m")
        .toISOString();
    }
  }
};
</script>
