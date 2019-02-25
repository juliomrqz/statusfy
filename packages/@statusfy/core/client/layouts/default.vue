<template>
  <div class="container mx-auto px-4 md:w-2/3">
    <app-header />

    <main>
      <nuxt />
    </main>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from "~/components/Header";
import AppFooter from "~/components/Footer";
import Head from "~/components/mixins/head";

export default {
  components: {
    AppHeader,
    AppFooter
  },
  mixins: [Head]
};
</script>
