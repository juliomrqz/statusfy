import format from 'date-fns/format'

export default {
  methods: {
    formatDate(date) {
      const enDate = format(date, 'MMMM Q, YYYY')
      const esDate = format(date, 'Q [de] MMMM [de] YYYY', {
        locale: require('date-fns/locale/es')
      })

      return this.$i18n.locale === 'en' ? enDate : esDate
    }
  }
}
