<template>
  <section
    id="features"
    :style="
      `background-image: url(${require('~/assets/img/dividers/wave-curve.svg')});`
    "
    class="bg-bottom bg-repeat-x bg-black py-6 z-10"
  >
    <div class="container mt-4 mb-8">
      <div class="text-center text-white mb-8">
        <h2
          class="text-3xl sm:text-3xl font-semibold leading-none tracking-tight mb-4"
        >
          {{ $t('features.title') }}
        </h2>

        <p
          class="max-w-md mx-auto text-xl sm:text-2xl text-blue-darker font-normal leading-tight mb-8"
        >
          {{ $t('features.description') }}
        </p>
      </div>

      <div
        class="flex flex-wrap lg:text-center bg-white rounded my-6 shadow p-6 h-full"
      >
        <div
          v-for="(feature, key) in features"
          :key="key"
          class="w-full sm:w-1/2 lg:w-1/3 px-6 py-2"
        >
          <div
            :class="`text-${feature.color}`"
            class="mb-8">
            <svgicon
              :name="`fortawesome/${feature.icon}`"
              class="align-middle svg-inline--fa fa-3x"
              heigth="48"
              width="auto"
            />
          </div>
          <h3 class="text-2xl font-semibold leading-none mb-3">
            {{ $t(`features.${key}.title`) }}
          </h3>
          <p
            class="text-lg leading-normal text-grey-darkest mb-8"
            v-html="$t(`features.${key}.description`)"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import '~/components/icons/fortawesome/database-solid'
import '~/components/icons/fortawesome/mobile-alt-solid'
import '~/components/icons/fortawesome/js-square-brands'
import '~/components/icons/fortawesome/language-solid'
import '~/components/icons/fortawesome/paint-roller-solid'
import '~/components/icons/fortawesome/globe-solid'

export default {
  data() {
    return {
      features: {
        markdown: {
          icon: 'database-solid',
          color: 'blue'
        },
        pwa: {
          icon: 'mobile-alt-solid',
          color: 'purple'
        },
        stack: {
          icon: 'js-square-brands',
          color: 'orange'
        },
        customization: {
          icon: 'paint-roller-solid',
          color: 'red'
        },
        i18n: {
          icon: 'language-solid',
          color: 'yellow'
        },
        hosting: {
          icon: 'globe-solid',
          color: 'green'
        }
      }
    }
  }
}
</script>
