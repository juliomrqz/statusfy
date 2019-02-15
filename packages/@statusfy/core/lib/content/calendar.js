const ics = require('ics')
const moment = require('moment')
const url = require('url')

const createDatabase = require('./database')

const extractDate = (value) => {
  return [
    value.getFullYear(),
    value.getMonth() + 1,
    value.getDate(),
    value.getHours(),
    value.getMinutes(),
    value.getSeconds()
  ]
}

module.exports = async function calendar (siteConfig, lang) {
  const database = await createDatabase(siteConfig)
  /* eslint-disable node/no-deprecated-api */
  const { host } = url.parse(siteConfig.baseUrl)
  /* eslint-enable */
  const events = []
  const productId = `-//Statusfy//${host || siteConfig.name}//calendar//scheduled//${lang.toUpperCase()}`

  // Future events
  const incidents = database.scheduled(lang).incidents

  // Past Events
  database.incidents(lang, 1, -1).incidents.forEach(i => {
    if (i.severity === 'under-maintenance' && i.scheduled && i.duration) {
      incidents.push(i)
    }
  })

  incidents.forEach(i => {
    const id = host ? { uid: `${i.id}@${host}` } : {}

    events.push({
      title: i.title,
      description: i.description,
      start: extractDate(i.scheduled),
      end: extractDate(moment(i.scheduled).add(i.duration, 'm').toDate()),
      productId,
      ...id
    })
  })

  let { error, value } = ics.createEvents(events)

  if (error) {
    throw new Error(error)
  } else {
    if (!value) {
      value = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:${productId}\nEND:VCALENDAR`
    }

    value = value.replace(
      `PRODID:${productId}`,
      `PRODID:${productId}\nNAME:${siteConfig.title}\nX-WR-CALNAME:${siteConfig.title}\nTIMEZONE-ID:UTC\nX-WR-TIMEZONE:UTC`
    )

    return value
  }
}
