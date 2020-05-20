<template>
  <section v-if="partners && partners.length > 0" :class="`mode-${mode}`">
    <div v-if="mode === 'advanced'" class="container">
      <div class="text-center">
        <h2>
          {{ text[language].title }}
        </h2>

        <p>
          {{ text[language].description }}
        </p>
      </div>

      <div class="text-center sponsors-container">
        <a
          v-for="partner in partners"
          v-bind:key="partner.MemberId"
          :href="partner.website"
          rel="noopener"
          target="_blank"
          class="sponsor">
          <img
            :src="partner.image"
            :alt="partner.name"
            :title="partner.description" />
        </a>
      </div>

      <div class="text-center">
        <a
          href="https://opencollective.com/statusfy#contribute"
          rel="noopener"
          target="_blank"
          class="btn btn-sm btn-outline">{{ text[language].becomePartner }}</a>
      </div>
    </div>
    <div v-else-if="mode === 'sidebar'" class="container">
      <div class="title">
        {{ text[language].title }}
      </div>

      <div class="text-center sponsors-container">
        <a
          v-for="partner in partners"
          v-bind:key="partner.MemberId"
          :href="partner.website"
          rel="noopener"
          target="_blank"
          class="sponsor">
          <img
            :src="partner.image"
            :alt="partner.name"
            :title="partner.description" />
        </a>
      </div>

      <div class="text-center">
        <a
          href="https://opencollective.com/statusfy#section-contribute"
          rel="noopener"
          target="_blank">{{ text[language].becomePartner }}</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    text: {
      en: {
        title: 'Sponsors',
        description: 'We would like to acknowledge these sponsors that help us to continue developing Statusfy.',
        becomePartner: 'Become a Partner'
      },
      es: {
        title: 'Patrocinadores',
        description: 'Nos gustaría reconocer a estos patrocinadores que nos ayudan a seguir desarollando Statusfy.',
        becomePartner: 'Conviértete en un Socio'
      }
    }
  }),
    props: {
    mode: {
      type: String,
      default: 'advanced',
      validator: function (value) {
        // The value must match one of these strings
        return ['sidebar', 'advanced'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    partners() {
      return process.env.PARTNERS
    },
    language() {
      return this.$lang.split('-')[0];
    }
  }
}
</script>


<style lang="stylus" scoped>
.container
  padding-bottom 1rem

.sponsor {
  margin-top: .5rem;
  margin-bottom: .5rem;
  opacity: 1;
  height: 3rem;

  filter: none;
  transition: all .35s ease;

  > img {
    height: 100%;
    max-width: 100%;
  }
}

// .mode-advanced {
  .sponsors-container {
    margin-bottom: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
    display: flex;
  }
// }


.mode-sidebar {
  .container {
    padding 1rem 1.5rem;
  }

  .title {
    font-size 1.1em
    font-weight bold
    margin-bottom: 0.5rem;
  }

  .sponsors-container {
    flex-wrap: wrap !important;
    flex-direction: row !important;
    // justify-content: start;
  }

  // .sponsor {
  //   width: 100%;
  // }
}

@media (min-width: 992px) {
  // .mode-advanced {
    .sponsors-container {
      flex-direction: row;
    }
  // }
}

@media (min-width: 768px) {
  .sponsor {
    opacity: 0.75;
    filter: grayscale(100%);

    &:hover {
      opacity: 1;
      filter: none;
    }
  }
}
</style>
