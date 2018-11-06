<template>
  <section
    :style="`background-image: url(${require('~/assets/img/dividers/top-left-curve.svg')});`"
    class="bg-top bg-repeat-x py-6 z-10">
    <div class="container mb-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl sm:text-3xl font-semibold leading-none tracking-tight mb-4">
          {{ $t('blog.titleLatest') }}
        </h2>

        <p class="text-xl sm:text-2xl text-blue-darker font-normal leading-tight mb-8">
          {{ $t('blog.description') }}
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
