<template>
  <div class="py-4 my-2">
    <nuxt-link :to="localePath('index')">
      <img
        :alt="$t('title')"
        :src="$statusfy.assets.mainLogo"
        class="h-10">
    </nuxt-link>
  </div>
</template>
