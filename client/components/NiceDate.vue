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
      default: 'short',
      validator: (value) => ['short', 'long'].indexOf(value) !== -1
    }
  },
  computed: {
    label () {
      const $t = this.$t.bind(this)
      const parsedDate = this.$statusfy.dayjs(this.date)

      return parsedDate.locale(this.$i18n.locale).format($t(`dates.formats.${this.format}`))
    }
  }
}
</script>
