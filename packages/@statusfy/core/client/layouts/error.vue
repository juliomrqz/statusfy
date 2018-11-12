<template>
  <section class="text-center py-6">
    <div class="pt-6 h-64">
      <div class="py-6">
        <h1 class="text-5xl mb-2 font-medium">{{ title }}</h1>
        <p class="text-xl my-4">{{ description }}</p>
      </div>

      <a
        :href="localePath('index')"
        class="font-medium mt-6">
        {{ $t('error.go-back-link') }}
      </a>
    </div>
  </section>
</template>

<script>
import Head from '~/components/mixins/head'

export default {
  mixins: [Head],
  props: {
    error: {
      type: Object || Error,
      required: true
    }
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },
  computed: {
    title () {
      const $t = this.$t.bind(this)

      return this.error.statusCode === 404
        ? $t('error.404.title')
        : $t('error.other.title')
    },
    description () {
      const $t = this.$t.bind(this)

      return this.error.statusCode === 404
        ? $t('error.404.description')
        : $t('error.other.description')
    }
  }
}
</script>
