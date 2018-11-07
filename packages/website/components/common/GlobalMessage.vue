<template>
  <div
    v-if="$t('globalMessage') !== ''"
    class="bg-orange text-white text-center py-2 px-4 h-16">
    <div
      class="p-2 items-center leading-none flex inline-flex h-full leading-tight"
    >
      <div class="font-semibold mr-2 flex-auto">{{ $t('globalMessage') }}</div>
    </div>
  </div>
</template>
