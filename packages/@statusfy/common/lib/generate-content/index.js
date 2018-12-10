const hash = require('hash-sum')
const _ = require('lodash')
const moment = require('moment')
const fse = require('fs-extra')
const path = require('upath')

const data = require('./data.json')
const severities = [
  'under-maintenance',
  'degraded-performance',
  'partial-outage',
  'major-outage'
]

const getDaySubtraction = (index) => {
  // Two incidents per day
  // a_n = 1/4 (2 n + (-1)^(n + 1) - 3)
  // n >= 1

  return (1 / 4) * ((2 * index) + Math.pow(-1, 1 + index) - 3)
}

const getId = (n, length) => n % length

const incidentTemplate = _.template(`---
id: <%= data.id %>
title: <%= data.title[lang] %>
description: <%= data.content[lang] %>
date: <%= data.date %>
modified: <%= data.modified %><% if (typeof(data.scheduled) !== 'undefined') { %>
scheduled: <%= data.scheduled %>
duration: 30<% } %>
severity: <%= data.severity %>
resolved: <%= data.resolved %>
affectedsystems:
  - <%= data.affectedsystems.join('\\n  - ') %>
---

<%= data.content[lang] %>

<% _.forEach(data.updates, function(update) { %>
::: update <%= update.title[lang] %> | <%= update.date %>
<%= update.content[lang] %>
:::
<% }); %>
`)

module.exports = function generateDemoContent (dest, finalDate, amount = 20) {
  // Empty Destination
  fse.emptyDirSync(dest)
  fse.outputFileSync(path.resolve(dest, '.keep'), '')

  let monthSubtraction = 0

  for (let i = 1; i <= amount; i++) {
    // 6 incidents per month
    if ((i % 6) === 0) {
      monthSubtraction += 1
    }

    const titleIndex = i === 1 ? (data.title.en.length - 1) : getId(i, data.title.en.length - 1)
    const contentIndex = i === 1 ? (data.content.en.length - 1) : getId(i, data.content.en.length - 1)
    const updatesContentIds = [
      getId(i, data.updates.content.en.length),
      getId(i + 1, data.updates.content.en.length),
      getId(i + 2, data.updates.content.en.length)
    ]
    const date = moment(finalDate)
      .subtract(getDaySubtraction(i), 'd')
      .subtract(monthSubtraction, 'M')

    const incident = {
      id: hash(i),
      date: date.toISOString(),
      modified: date.add(2, 'h').toISOString(),
      scheduled: i === 1 ? moment(finalDate).add(7, 'd').toISOString() : undefined,
      resolved: i > 2,
      severity: i === 1 ? severities[0] : severities[getId(i, 4)],
      affectedsystems: data.affectedsystems.slice(0, getId(i, 4) + 1),
      title: {
        en: data.title.en[titleIndex],
        es: data.title.es[titleIndex]
      },
      content: {
        en: data.content.en[contentIndex],
        es: data.content.es[contentIndex]
      },
      updates: i === 1 ? [] : [
        {
          date: date.add(2, 'h').toISOString(),
          title: {
            en: data.updates.title.resolved.en,
            es: data.updates.title.resolved.es
          },
          content: {
            en: data.updates.content.en[updatesContentIds[0]],
            es: data.updates.content.es[updatesContentIds[0]]
          }
        },
        {
          date: date.add(1, 'h').toISOString(),
          title: {
            en: data.updates.title.monitoring.en,
            es: data.updates.title.monitoring.es
          },
          content: {
            en: data.updates.content.en[updatesContentIds[1]],
            es: data.updates.content.es[updatesContentIds[1]]
          }
        },
        {
          date: date.add(30, 'm').toISOString(),
          title: {
            en: data.updates.title.resolved.en,
            es: data.updates.title.resolved.es
          },
          content: {
            en: data.updates.content.en[updatesContentIds[2]],
            es: data.updates.content.es[updatesContentIds[2]]
          }
        }
      ]
    }

    // Write File
    const fileName = `${incident.date.split('T')[0]}_${incident.id}.md`
    const incidentContentEn = incidentTemplate({
      lang: 'en',
      data: incident
    })
    const incidentContentEs = incidentTemplate({
      lang: 'es',
      data: incident
    })

    fse.outputFileSync(path.resolve(dest, fileName), incidentContentEn)
    fse.outputFileSync(path.resolve(dest, 'es', fileName), incidentContentEs)
  }
}
