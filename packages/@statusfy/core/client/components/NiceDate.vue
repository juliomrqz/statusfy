<template>
  <time :datetime="date">
    {{ label }}
  </time>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true
    },
    includeUTC: {
      type: Boolean,
      default: true
    },
    format: {
      default: "short",
      validator: value => ["short", "long", "month"].indexOf(value) !== -1
    }
  },
  computed: {
    label() {
      const $t = this.$t.bind(this);
      const parsedDate = this.$statusfy.dates.parse(this.date);
      const format = this.includeUTC
        ? $t(`dates.formats.${this.format}`)
        : $t(`dates.formats.${this.format}`).replace(" UTC", "");

      return this.$statusfy.dates.format(parsedDate, format, this.$i18n.locale);
    }
  }
};
</script>
