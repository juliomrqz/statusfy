<template>
  <div class="offline-container">
    <h1 class="offline-title">
      {{ $t("offline.subtitle") }}
    </h1>

    <p class="offline-description">
      {{ $t("offline.description") }}
    </p>

    <div class="offline-message">
      <svgicon
        name="fortawesome/unlink-solid"
        width="15em"
        height="15em"
        class="svg-inline--fa"
      />
    </div>
  </div>
</template>

<script>
import "~/components/icons/fortawesome/unlink-solid";

export default {
  head() {
    const $t = this.$t.bind(this);

    return {
      title: $t("offline.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: $t("offline.description")
        },
        { hid: "robots", name: "robots", content: "noindex, follow" }
      ]
    };
  }
};
</script>

<style scopped>
.offline-container {
  @apply text-center;
}

.offline-title {
  @apply text-5xl font-medium my-4;
}

.offline-description {
  @apply text-xl leading-normal max-w-sm mx-auto;
}

.offline-message {
  @apply absolute max-w-screen max-h-screen opacity-25 w-full;

  top: 5rem;
  left: 0;
  color: var(--grey);
}
</style>
