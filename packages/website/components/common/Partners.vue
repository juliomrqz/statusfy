<template>
  <section 
    v-if="$store.state.partners && $store.state.partners.length > 0" 
    class="bg-white py-6 z-10"
  >
    <div class="container mb-8">
      <div class="text-center mb-4">
        <h2
          :class="{'text-3xl': mode === 'primary', 'text-2xl': mode === 'secondary'}"
          class="font-semibold leading-none mb-4"
        >
          {{ $t('partners.title') }}
        </h2>

        <p
          :class="{'text-xl sm:text-2xl': mode === 'primary', 'text-lg sm:text-xl': mode === 'secondary'}"
          class="text-blue-darker font-normal leading-tight"
        >
          {{ $t('partners.description') }}
        </p>
      </div>

      <div class="text-center mb-4 flex flex-col lg:flex-row flex-no-wrap items-center justify-center">
        <a
          v-for="partner in $store.state.partners"
          :key="partner.MemberId"
          :href="partner.website"
          :class="{'h-16': mode === 'primary', 'h-12': mode === 'secondary'}"
          rel="noopener"
          target="_blank"
          class="sponsor"
        >
          <img
            :src="partner.image"
            :alt="partner.name"
            :title="partner.description"
            class="h-full max-h-full"
          >
        </a>
      </div>

      <div class="text-center mb-8">
        <span
          :class="{'text-xl': mode === 'primary', 'text-lg': mode === 'secondary'}"
          class="block mb-4"
        >{{ $t('partners.supportUs') }}</span>

        <a
          :class="{'btn-sm': mode === 'secondary'}"
          href="https://bazzite.xyz/StatusfyOpenCollective#contribute"
          rel="noopener"
          target="_blank"
          class="btn btn-blue-outline"
        >{{ $t('partners.becomePartner') }}</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'primary',
      validator: function (value) {
        // The value must match one of these strings
        return ['primary', 'secondary'].indexOf(value) !== -1
      }
    }
  }
}
</script>


<style scoped>
.sponsor {
  @apply my-2 opacity-100;

  filter: none;
  transition: all .35s ease;
}

@screen md {
  .sponsor {
    @apply opacity-75;
    filter: grayscale(100%);

    &:hover {
      @apply opacity-100;
      filter: none;
    }
  }
}
</style>
