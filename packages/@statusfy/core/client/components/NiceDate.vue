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
    format: {
      default: "short",
      validator: value => ["short", "long", "month"].indexOf(value) !== -1
    }
  },
  computed: {
    label() {
      const $t = this.$t.bind(this);
      const parsedDate = this.$statusfy.dates.parse(this.date);

      return this.$statusfy.dates.format(
        parsedDate,
        $t(`dates.formats.${this.format}`),
        this.$i18n.locale
      );
    }
  }
};
</script>
