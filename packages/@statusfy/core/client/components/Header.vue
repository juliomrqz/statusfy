<template>
  <div class="header">
    <nuxt-link
      :to="localePath('index')"
      class="logo-container"
    >
      <img
        :alt="$t('title')"
        :src="$statusfy.assets.mainLogo"
        class="logo"
      >
    </nuxt-link>
    <component
      :is="titleTag"
      class="title"
    >
      {{ $t('title') }}
    </component>

    <no-ssr>
      <Subscribe
        v-if="displaySubscribe"
        class="subscribe-container"
      />
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
  },
  computed: {
    displaySubscribe () {
      if (this.$statusfy.notifications && (typeof this.$statusfy.notifications === 'object')) {
        return !!Object.values(this.$statusfy.notifications).find(v => v)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.title {
  color: var(--grey-darkest);
}
</style>
