// Day.js
import dayjs from 'dayjs'
<%= options.locales.map(locale => locale.code !== 'en' ? "import 'dayjs/locale/" + locale.code + "'" : '').join('\n') %>

export default (ctx, inject) => {
  const statusfy = {
    dayjs
  }

  // Inject Statusfy to the context as $statusfy
  ctx['$statusfy'] = statusfy
  inject('statusfy', statusfy)
}
