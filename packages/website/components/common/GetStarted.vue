<template>
  <section class="bg-white py-8">
    <div class="w-5/6 max-w-xl ml-auto mr-auto my-8">
      <div class="flex lg:items-center flex-col lg:flex-row lg:justify-between">
        <div class="mb-8 lg:mb-0 lg:pr-4">
          <h2 class="text-2xl font-normal tracking-tight leading-none mb-3">
            {{ $t('getStarted.title') }}
          </h2>
          <h3 class="text-xl text-grey-dark font-normal leading-tight">
            {{ $t('getStarted.description') }}
          </h3>
        </div>
        <div class="lg:pl-4">
          <div class="flex items-center">
            <a
              :href="$t('links.getStarted.url')"
              class="btn btn-blue mr-4"
              target="__blank">
              {{ $t('links.getStarted.title') }}
            </a>
            <a
              :href="$t('links.github.url')"
              class="btn btn-grey"
              target="__blank">
              {{ $t('links.github.title') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
