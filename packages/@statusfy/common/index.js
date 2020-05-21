const path = require('path')

try {
  require('./lib/index')
} catch (error) {
  require('ts-node').register({
    project: path.join(__dirname, './tsconfig.json')
  })

  require('./src/index')
}
