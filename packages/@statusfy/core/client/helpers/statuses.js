export const statusesInfo = ($t) => {
  // Important order of relevance
  const keys = [
    'under-maintenance',
    'major-outage',
    'partial-outage',
    'degraded-performance',
    'operational'
  ]

  let i18nKeys
  if ($t) {
    i18nKeys = keys.reduce((acc, cur) => { acc[cur] = $t(`statuses.${cur}`); return acc }, {})
  }

  const icons = {
    'under-maintenance': 'clock',
    'degraded-performance': 'exclamation-circle',
    'partial-outage': 'minus-circle',
    'major-outage': 'times-circle',
    'operational': 'check-circle'
  }

  return {
    keys,
    i18nKeys,
    icons
  }
}

export const getStatusInfo = ($t, status) => {
  const statuses = statusesInfo($t)

  return {
    title: statuses.i18nKeys[status],
    icon: statuses.icons[status]
  }
}
