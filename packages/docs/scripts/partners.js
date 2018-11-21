const path = require('path')
const axios = require('axios')
const consola = require('consola')
const fs = require('fs-extra')

const retrieveParters = async () => {
  console.info('Retrieveing Partners')

  try {
    const response = await axios.get('https://opencollective.com/statusfy/members/all.json?TierId=6927')

    const partners = response.data.filter(p => p.isActive)

    consola.success(`${partners.length} partner(s) were found`)

    await fs.writeJson(
      path.resolve(__dirname, '..', 'src', '.vuepress', './partners.json'),
      partners)

    process.exit(0)
  } catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

retrieveParters()
