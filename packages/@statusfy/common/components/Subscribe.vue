
<template>
  <div>
    <div>{{ text[lang].title }}</div>

    <!-- <form
      action="https://gridsome.us19.list-manage.com/subscribe/post?u=960a357f3405a688ff935a10e&id=42bbd30818"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
      novalidate="novalidate">

      <div class="flex">
        <div>
          <input type="email" aria-label="Email" :placeholder="text[lang].placeholder" name="EMAIL" id="mce-EMAIL" class="email">
        </div>

        <div class="newsletter__button">
          <input type="submit" :value="text[lang].button" name="subscribe" id="mc-embedded-subscribe" class="button">
        </div>
      </div>

    </form> -->

  </div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  data() {
    return {
      text: {
        en: {
          title: 'Want to keep up with the latest news, tips & tricks from Statuffy?',
          subtitle: 'Subscribe to the Newsletter!',
          placeholder: 'your@email.com',
          button: 'Subscribe'
        },
        es: {
          title: '¿Desea mantenerse al día con las últimas noticias, consejos y trucos de Statuffy?',
          subtitle: '¡Suscríbete al boletín!',
          placeholder: 'tu@email.com',
          button: 'Suscribirse'
        }
      }
    }
  }
}
</script>
