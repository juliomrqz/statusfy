<template>
  <div
    class="flex w-full flex-col h-screen mx-auto max-w-md p-3">
    <main
      role="main"
      class="p-6 mt-auto">
      <div class="flex justify-center items-center mb-2">
        <img
          src="~/assets/img/logo.svg"
          alt="Statusfy"
          height="70">
      </div>
      <p class="text-xl pb-4">{{ $t('slogan') }}</p>
    </main>

    <footer class="mt-auto">
      <div class="text-center">
        <p class="pb-4">
          <nuxt-link
            v-for="locale in $i18n.locales"
            v-if="locale.code !== $i18n.locale"
            :key="locale.code"
            :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
        </p>
        <p class="pb-4">
          <ul class="list-reset flex justify-center items-center">
            <li
              class="mr-2"
              v-html="$t('documentationLink')"/>
            <li>
              <a
                href="http://demo.statusfy.co"
                class="mr-2"
                target="_blank"
                rel="noopener">Demo</a>
            </li>
            <li>
              <a
                href="https://github.com/statusfy/statusfy"
                target="_blank"
                rel="noopener">Github</a>
            </li>
          </ul>
        </p>
        <p
          class="pb-4"
          v-html="$t('copyright')" />
      </div>
    </footer>
  </div>
</template>
