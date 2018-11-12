<template>
  <div class="py-4 my-2 flex flex-col items-center md:flex-row">
    <nuxt-link :to="localePath('index')">
      <img
        :alt="$t('title')"
        :src="$statusfy.assets.mainLogo"
        class="h-10">
    </nuxt-link>
    <component
      :is="titleTag"
      class="title font-normal mx-4 my-2 text-xl">
      {{ $t('title') }}
    </component>
  </div>
</template>

<script>
export default {
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
