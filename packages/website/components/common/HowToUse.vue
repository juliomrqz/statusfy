<template>
  <section
    :style="
      `background-image: url(${require('~/assets/img/dividers/bottom-triangle.svg')});`
    "
    class="bg-bottom bg-repeat-x py-6 z-10 bg-grey-lighter"
  >
    <div class="container mt-4 mb-8">
      <div class="text-center mb-8">
        <h2
          class="text-3xl sm:text-3xl font-semibold leading-none tracking-tight mb-4"
        >
          {{ $t('howToUse.title') }}
        </h2>

        <p
          class="max-w-lg mx-auto text-xl sm:text-2xl text-blue-darker font-normal leading-tight mb-8"
        >
          {{ $t('howToUse.description') }}
        </p>
      </div>

      <div
        class="flex flex-wrap items-stretch my-6 p-6"
      >
        <div
          v-for="(step, key, index) in step"
          :key="key"
          class="w-full sm:w-full lg:w-1/4 mb-8"
        >
          <a
            :href="$t(`howToUse.${key}.link`)"
            target="_blank"
            rel="noopener"
            class="relative block mx-4 p-4 bg-white rounded shadow h-full cursor-pointer hover:shadow-md">
            <div class="absolute text-right text-grey-darkest pin-t pin-r mr-3 mt-2 text-lg font-semibold">
              {{ index + 1 }}
            </div>
            <div
              :class="`bg-${step.color}`"
              class="sub-title absolute pin-t pin-l text-white rounded shadow py-4 px-4 ml-3">
              <h3 class="text-base font-semibold leading-none">
                {{ $t(`howToUse.${key}.title`) }}
              </h3>
            </div>
            <p
              class="leading-normal text-grey-darkest mt-6"
              v-html="$t(`howToUse.${key}.description`)"/>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      step: {
        step1: {
          color: 'purple'
        },
        step2: {
          color: 'orange'
        },
        step3: {
          color: 'blue'
        },
        step4: {
          color: 'green'
        }
      }
    }
  }
}
</script>

<style scoped>
section {
  background-size: 100% 50px;
}

.sub-title {
  transform: translateY(-40%);
}
</style>
