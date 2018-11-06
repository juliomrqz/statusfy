<template>
  <section
    class="bg-bottom bg-repeat-x h-full pb-8 bg-white">
    <div class="container">
      <div class="flex flex-wrap items-center justify-center text-center lg:text-left">
        <div class="w-full p-4">
          <h1 class="text-3xl sm:text-4xl font-semibold leading-none tracking-tight mb-4">
            {{ $t('blog.title') }}
          </h1>
          <h2 class="text-lg sm:text-xl text-blue-darker font-normal leading-normal mb-2">
            {{ $t('blog.description') }}
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
section {
  background-size: 100% 100px;
}
</style>
