<template>
  <div
    v-if="$t('globalMessage') !== ''"
    class="bg-orange text-white text-center py-2 px-4 h-16"
  >
    <div class="p-2 items-center leading-none flex inline-flex h-full leading-tight">
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="font-semibold mr-2 flex-auto"
        v-html="$t('globalMessage')"
      />
      <!-- eslint-enable -->
    </div>
  </div>
</template>

<style scoped>
div >>> a {
  @apply text-grey-lightest underline;

  &:hover {
    @apply text-grey-lighter;
  }
}
</style>
