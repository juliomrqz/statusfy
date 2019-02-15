<template>
  <div class="container mx-auto px-4 md:w-2/3">
    <app-header />

    <main>
      <div class="flex flex-col sm:flex-row items-center justify-between">
        <h1 class="font-medium mb-4">
          {{ $t('incidents.incidents-history') }}
        </h1>

        <div class="sm:mt-0 mt-2">
          <nuxt-link
            :to="localePath('index')"
            class="btn mb-0 sm:mb-4"
          >
            {{ $t('incidents.current-status') }}
          </nuxt-link>
        </div>
      </div>

      <nuxt />
    </main>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/Header'
import AppFooter from '~/components/Footer'
import Head from '~/components/mixins/head'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  mixins: [Head]
}
</script>
