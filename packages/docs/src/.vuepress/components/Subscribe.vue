<template>
  <div
    id="subscribe"
    class="container">
    <div class="title">{{ text[language].title }}</div>
    <div class="subtitle">{{ text[language].subtitle }}</div>

    <form
      id="mc-embedded-subscribe-form"
      action="https://bazzite.us11.list-manage.com/subscribe/post?u=34b09d915eae6d2857425420f&id=095eb8d814"
      method="post"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate>

      <input
        type="text"
        name="b_34b09d915eae6d2857425420f_095eb8d814"
        tabindex="-1"
        value=""
        class="hidden">

      <div class="inputs-container">
        <div class="email">
          <input
            id="mce-EMAIL"
            :placeholder="text[language].placeholder"
            type="email"
            value=""
            name="EMAIL"
            required>
        </div>

        <div class="button">
          <input
            id="mc-embedded-subscribe"
            :value="text[language].button"
            type="submit"
            name="subscribe"
            class="btn">
        </div>
      </div>
    </form>

    <div class="terms">
      <a
        :href="text[language].privacyLink"
        target="_blank"
        rel="noopener">
        {{ text[language].privacyText }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: {
        en: {
          title: 'Want to keep up with the latest news, tips and tricks from Statusfy?',
          subtitle: 'Subscribe to our Newsletter!',
          placeholder: 'your@email.com',
          button: 'Subscribe',
          privacyText: 'Privacy Policy',
          privacyLink: 'https://aceforth.com/legal/privacy'
        },
        es: {
          title: '¿Deseas mantenerte al día con las últimas noticias, consejos y trucos de Statusfy?',
          subtitle: '¡Suscríbete a nuestro boletín!',
          placeholder: 'tu@email.com',
          button: 'Suscribirse',
          privacyText: 'Política de Privacidad',
          privacyLink: 'https://aceforth.com/es/legal/privacy'
        }
      }
    }
  },
  computed: {
    language() {
      return this.$lang.split('-')[0];
    }
  }
}
</script>


<style lang="stylus" scoped>
.hidden
  display none

.container
  text-align center
  position relative
  padding 2rem
  padding-bottom 0
  max-width 40rem
  margin-bottom 1rem
  margin-left auto
  margin-right auto
  line-height 1.25

.title
  font-size 1.25rem
  margin-bottom .5rem
  font-weight 600

.subtitle
  font-size 1.125rem
  margin-bottom 1rem

.terms
  font-size .875rem

  a
    color #959da5

    &:hover
      color #1b1f23

.inputs-container
  align-items center
  flex-wrap nowrap
  flex-direction column
  display flex

@media (min-width: 576px)
  .inputs-container
    flex-direction row

input
  font-family inherit
  font-size 100%
  line-height 1.15
  margin 0
  overflow visible
  box-sizing inherit

.email
  margin-bottom 1rem
  flex-grow 1
  display flex

  input
    width 100%
    color #6a737d
    padding .75rem
    line-height 1.25
    border-width 1px
    border-radius .25rem
    -webkit-appearance none
    -moz-appearance none
    appearance none
    border 1px solid #e1e4e8
    background-color #fafbfc
    &:focus
      outline 0

.button
  margin-bottom 1rem
  flex none


@media (min-width: 576px)
  .button
    input
      margin-left 1rem
</style>
