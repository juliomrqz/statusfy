const path = require('path')

require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json')
})

require('../src/index')
