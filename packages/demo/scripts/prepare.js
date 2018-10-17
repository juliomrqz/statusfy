const path = require('path')

const { generateDemoContent } = require('@statusfy/common')

const prepare = () => {
  generateDemoContent(
    path.resolve(__dirname, '../content'),
    new Date(),
    50
  )
}

prepare()
