<template>
  <section
    :style="`background-image: url(${require('~/assets/img/dividers/bottom-triangle.svg')});`"
    class="bg-bottom bg-repeat-x py-6 z-10 bg-grey-lighter">
    <div class="w-5/6 max-w-2xl ml-auto mr-auto mt-4 mb-8 h-full">
      <div class="text-center mb-8 h-full">
        <h2 class="text-3xl sm:text-3xl font-semibold leading-none tracking-tight mb-4">
          {{ $t('howItWorks.title') }}
        </h2>

        <p class="text-xl sm:text-2xl text-blue-darker font-normal leading-tight mb-8">
          {{ $t('howItWorks.description') }}
        </p>
      </div>
    </div>
  </section>
</template>


<style scoped>
section {
  background-size: 100% 50px;
}
</style>
