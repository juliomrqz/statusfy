export default function start() {
  try {
    require('@statusfy/core/src/start')
  } catch (error) {
    console.debug(error)

    require('@statusfy/core/lib/start')
  }

  return Promise.resolve(true)
}
