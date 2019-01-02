const nodemon = require('nodemon')

const { logger, path } = require('@statusfy/common')

module.exports = async function dev (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'development'

  const watchPaths = [
    path.join(sourceDir, 'locales'),
    path.join(sourceDir, 'assets'),
    path.join(sourceDir, 'public'),
    path.join(sourceDir, 'config.js'),
    path.join(sourceDir, 'config.yml'),
    path.join(sourceDir, 'config.toml')
  ]

  nodemon({
    verbose: true,
    script: path.join(__dirname, 'utils', 'start-dev.js'),
    watch: watchPaths,
    ext: '*',
    exec: `cross-env STATUSFY_SOURCE_DIR='${sourceDir}' STATUSFY_CLI_OPTIONS='${JSON.stringify(cliOptions)}' node`
  })

  nodemon.on('start', () => {
    logger.debug('nodemon has started')
  }).on('quit', () => {
    logger.debug('nodemon has quit')
    process.exit()
  }).on('restart', (files) => {
    logger.info('Restarting Server due to changes in: \n', files.join('\n'))
  }).on('crash', () => {
    logger.debug('nodemon crashed for some reason')
  })
}
