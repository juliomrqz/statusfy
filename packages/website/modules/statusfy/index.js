import { resolve } from 'path'
import axios from 'axios'
import pick from 'lodash.pick'
import consola from 'consola'

export default async function Statusfy () {
  // Merge all option sources
  const options = {}

  try {
    const response = await axios.get('https://opencollective.com/statusfy/members/all.json?TierId=6927')

    const partners = response.data
      .filter(p => p.isActive)
      .map(p => pick(p, ['MemberId', 'website', 'image', 'name', 'description']))

    options.partners = partners
  } catch (error) {
    consola.error(error)
  }

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js.tpl'),
    fileName: 'statusfy.js',
    options
  })
}

