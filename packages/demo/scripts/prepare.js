const path = require('path')

const { generateDemoContent } = require('@statusfy/shared-utils')

const prepare = () => {
  generateDemoContent(
    path.resolve(__dirname, '../content'),
    new Date(),
    50
  )
}

prepare()
