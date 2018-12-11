<template>
  <div class="header">
    <nuxt-link
      :to="localePath('index')"
      class="logo-container">
      <img
        :alt="$t('title')"
        :src="$statusfy.assets.mainLogo"
        class="logo">
    </nuxt-link>
    <component
      :is="titleTag"
      class="title">
      {{ $t('title') }}
    </component>

    <no-ssr>
      <Subscribe class="subscribe-container"/>
    </no-ssr>
  </div>
</template>

<script>
import Subscribe from './Subscribe'

export default {
  components: {
    Subscribe
  },
  props: {
    titleTag: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<style scoped>
.title {
  color: var(--grey-darkest);
}
</style>
