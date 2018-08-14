export default function ({ $axios, error, app }) {
  $axios.onError(errorValue => {
    const code = parseInt(errorValue.response && errorValue.response.status)
    if (code === 404) {
      error({ statusCode: 404, message: 'Not found' })
    }
  })

  $axios.onRequest(config => {
    if (!process.static) {
      // Send client language
      config.headers.common['Accept-Language'] = app.i18n.locale
    }
  })
}
