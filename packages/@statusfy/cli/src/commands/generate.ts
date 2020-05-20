export default function generate() {
  try {
    require('@statusfy/core/src/generate')
  } catch (error) {
    console.debug(error)

    require('@statusfy/core/lib/generate')
  }

  return Promise.resolve(true)
}
