<template>
  <div class="footer">
    <div class="footer-links">
      <div>
        <a
          v-for="link in links"
          :key="link.key"
          :href="link.url"
          :title="link.title"
          target="_blank"
          rel="noopener"
        >{{ link.title }}</a>
      </div>

      <div>
        {{ $t('labels.powered-by') }}
        <a
          :href="statusfyHomeLink"
          target="_blank"
          rel="noopener"
        >Statusfy</a>
      </div>
    </div>
    <div
      v-if="$i18n.locales.length > 1"
      class="footer-language-swticher"
    >
      <template v-for="locale in $i18n.locales">
        <nuxt-link
          v-if="locale.code !== $i18n.locale"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          :class="{ 'active': locale.code === $i18n.locale }"
        >
          {{ locale.name }}
        </nuxt-link>
        <a
          v-else
          :key="locale.code"
          :href="switchLocalePath(locale.code)"
          :class="{ 'active': locale.code === $i18n.locale }"
        >
          {{ locale.name }}</a>
      </template>
    </div>
  </div>
</template>

<script>
import get from 'lodash.get'

export default {
  computed: {
    links () {
      const $t = this.$t.bind(this)
      const allowedLinksKeys = ['home', 'contact', 'support']
      const themeLinks = get(this.$statusfy, ['theme', 'links'])
      const links = {}

      allowedLinksKeys.forEach(key => {
        if (get(themeLinks, [this.$i18n.locale, key])) {
          links[key] = {
            key,
            title: $t(`labels.${key}`),
            url: get(themeLinks, [this.$i18n.locale, key])
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
