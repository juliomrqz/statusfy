<template>
  <div class="container mx-auto px-4 md:w-2/3">
    <app-header/>

    <main>
      <div class="flex flex-col sm:flex-row items-center justify-between">
        <h1 class="font-medium">{{ $t('incidents.incidents-history') }}</h1>

        <div class="text-center">
          <nuxt-link
            :to="localePath('index')"
            class="inline-block bg-white rounded-full font-medium border py-2 px-4 shadow">
            {{ $t('incidents.current-incidents') }}
          </nuxt-link>
        </div>
      </div>

      <nuxt/>
    </main>

    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '~/components/Header'
import AppFooter from '~/components/Footer'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
