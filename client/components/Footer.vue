<template>
  <div class="py-4 my-4">
    <nuxt-link
      v-for="locale in $i18n.locales"
      v-if="locale.code !== $i18n.locale"
      :key="locale.code"
      :to="switchLocalePath(locale.code)">
      {{ locale.name }}
    </nuxt-link>
  </div>
</template>
