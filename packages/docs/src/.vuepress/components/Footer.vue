<template>
  <div class="footer">
    <div v-if="language === 'en'">
      Copyright © 2018 <a href="https://www.bazzite.com?ref=statusfy-docs" target="_blank" rel="noopener">Bazzite, LLC</a>. All Rights Reserved.
    </div>
    <div v-else-if="language === 'es'">
      Copyright © 2018 <a href="https://www.bazzite.com/es/?ref=statusfy-docs" target="_blank" rel="noopener">Bazzite, LLC</a>. Todos los derechos reservados.
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$lang.split('-')[0];
    }
  }
}
</script>
