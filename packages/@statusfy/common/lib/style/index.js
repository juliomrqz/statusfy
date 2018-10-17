const colors = {
  'transparent': 'transparent',

  'black': '#22292f',
  'grey-darkest': '#3d4852',
  'grey-darker': '#606f7b',
  'grey-dark': '#8795a1',
  'grey': '#b8c2cc',
  'grey-light': '#dae1e7',
  'grey-lighter': '#f1f5f8',
  'grey-lightest': '#f8fafc',
  'white': '#ffffff',

  'blue': '#2196F3',
  'indigo': '#6610f2',
  'green': '#4CAF50',
  'orange': '#fd7e14',
  'red': '#e51c23'
}

const globalGuidelines = {
  'body-bg': colors['grey-lightest'],
  'body-color': colors['black'],

  'incident-bg': colors['white'],
  'incident-border-color': colors['grey-light'],

  'btn-bg': colors['white']
}

module.exports = {
  colors,
  globalGuidelines
}
