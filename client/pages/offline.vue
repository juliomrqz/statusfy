<template>
  <div class="text-center">
    <h1 class="text-5xl font-medium my-4">{{ $t('offline.subtitle') }}</h1>

    <p class="text-xl leading-normal max-w-sm mx-auto">
      {{ $t('offline.description') }}
    </p>

    <div class="text-grey absolute max-w-screen max-h-screen opacity-25 w-full">
      <svgicon
        name="fortawesome/unlink-solid"
        width="15em"
        height="15em"
        class="svg-inline--fa"/>
    </div>
  </div>
</template>

<script>
import '~/components/icons/fortawesome/unlink-solid'

export default {
  head () {
    const $t = this.$t.bind(this)

    return {
      title: $t('offline.title'),
      meta: [
        { hid: 'description', name: 'description', content: $t('offline.description') },
        { hid: 'robots', name: 'robots', content: 'noindex, follow' }
      ]
    }
  }
}
</script>

<style>
  .absolute {
    top: 12%;
    left: 0;
  }
</style>
