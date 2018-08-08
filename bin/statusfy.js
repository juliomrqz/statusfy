// Based on https://github.com/vuejs/vuepress/blob/master/bin/vuepress.js
const chalk = require('chalk')
const semver = require('semver')

const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `Minimum Node version not met:\n` +
    `You are using Node ${process.version}, ` +
    `but Statusfy requires Node ${requiredVersion}.`
  ))
  console.log(chalk.red(`Please upgrade your Node version.`))

  process.exit(1)
}

const path = require('path')
const program = require('commander')

const { dev, build, generate, start } = require('../lib')
const sourceDir = path.resolve('.')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('dev')
  .description('Starts the application in development mode (hot-code reloading, error reporting, etc.).')
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-H, --host <host>', 'use specified host (default: 0.0.0.0)')
  .action(({ host, port }) => {
    wrapCommand(dev)(sourceDir, { host, port })
  })

program
  .command('build')
  .description('Compiles the application for production deployment')
  .action(() => {
    wrapCommand(build)(sourceDir, { })
  })

program
  .command('generate')
  .description('Generate a static web application (server-rendered)')
  .option('-d, --dest <outDir>', 'specify generate output dir (default: ./dist)')
  .action(({ dest }) => {
    const outDir = dest ? path.resolve(dest) : null
    wrapCommand(generate)(sourceDir, { outDir })
  })

program
  .command('start')
  .description(`Starts the application in production mode. The application should be compiled with ${chalk.cyan(`statusfy build`)} first.`)
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-H, --host <host>', 'use specified host (default: 0.0.0.0)')
  .action(({ host, port }) => {
    wrapCommand(start)(sourceDir, { host, port })
  })

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.\n`))
  })

// add some useful info on help
program.on('--help', () => {
  console.log(`\n  Run ${chalk.cyan(`statusfy <command> --help`)} for detailed usage of given command.\n`)
})

program.commands.forEach(c => c.on('--help', () => console.log()))
program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function wrapCommand (fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      console.error(chalk.red(err.stack))
      process.exitCode = 1
    })
  }
}
