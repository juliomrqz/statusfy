
<template>
  <div
    id="subscribe"
    class="p-8 mb-4 rounded leading-tight relative text-center w-full">
    <div class="text-xl font-semibold mb-2">{{ text[$i18n.locale].title }}</div>
    <div class="text-lg mb-4">{{ text[$i18n.locale].subtitle }}</div>

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

      <div class="flex flex-col sm:flex-row items-center flex-no-wrap">
        <div class="flex-grow mb-4">
          <input
            id="mce-EMAIL"
            :placeholder="text[$i18n.locale].placeholder"
            type="email"
            value=""
            name="EMAIL"
            class="appearance-none border rounded w-full py-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline leading-none"
            required>
        </div>

        <div class="flex-none mb-4">
          <input
            id="mc-embedded-subscribe"
            :value="text[$i18n.locale].button"
            type="submit"
            name="subscribe"
            class="btn btn-blue sm:ml-4">
        </div>
      </div>
    </form>

    <div class="text-sm">
      <a
        :href="text[$i18n.locale].privacyLink"
        target="_blank"
        rel="noopener"
        class="text-grey-dark">
        {{ text[$i18n.locale].privacyText }}
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
          privacyLink: 'https://www.bazzite.com/legal/privacy'
        },
        es: {
          title: '¿Deseas mantenerte al día con las últimas noticias, consejos y trucos de Statusfy?',
          subtitle: '¡Suscríbete a nuestro boletín!',
          placeholder: 'tu@email.com',
          button: 'Suscribirse',
          privacyText: 'Política de Privacidad',
          privacyLink: 'https://www.bazzite.com/es/legal/privacy'
        }
      }
    }
  }
}
</script>
