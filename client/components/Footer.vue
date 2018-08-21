<template>
  <div>
    <div class="flex flex-col sm:flex-row items-center justify-between py-4 mt-4 mb-2 text-grey-dark">
      <div>
        <a
          v-for="link in links"
          :key="link.key"
          :href="link.url"
          :title="link.title"
          class="mr-4">{{ link.title }}</a>
      </div>

      <div>
        {{ $t('labels.powered-by') }}
        <a
          :href="statusfyHomeLink"
          target="_blank"
          rel="noopener">Statusfy</a>
      </div>
    </div>
    <div
      v-if="$i18n.locales.length > 1"
      class="text-center mb-6">
      <template v-for="locale in $i18n.locales">
        <nuxt-link
          v-if="locale.code !== $i18n.locale"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          :class="{ 'font-medium text-black': locale.code === $i18n.locale }"
          class="mx-2">{{ locale.name }}</nuxt-link>
        <a
          v-else
          :key="locale.code"
          :href="switchLocalePath(locale.code)"
          :class="{ 'font-medium text-black': locale.code === $i18n.locale }"
          class="mx-2">{{ locale.name }}</a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    links () {
      const $t = this.$t.bind(this)
      const $te = this.$te.bind(this)
      const allowedLinksKeys = ['home', 'contact', 'support']
      const links = {}

      allowedLinksKeys.forEach(key => {
        if ($te(`links.${key}`)) {
          links[key] = {
            key,
            title: $t(`labels.${key}`),
            url: $t(`links.${key}`)
          }
        }
      })

      return links
    },
    statusfyHomeLink () {
      const urls = {
        'en': 'https://statusfy.co',
        'es': 'https://statusfy.co/es'
      }

      if (urls[this.$i18n.locale]) {
        return urls[this.$i18n.locale]
      } else {
        return urls['en']
      }
    }
  }
}
</script>
