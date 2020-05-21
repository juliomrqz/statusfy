import _getPort from 'get-port'

export function getPort() {
  return _getPort({ port: 3000 })
}
