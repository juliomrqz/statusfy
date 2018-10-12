// Inspired on https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/cli/index.js
const path = require('path')
const program = require('commander')
const semver = require('semver')
const { chalk } = require('@statusfy/shared-utils')

const packageError = (name) => {
  console.log(chalk.red(
    `\n[statusfy] @statusfy/cli ` +
    `requires ${name} to be installed.\n` +
    `${err}`
  ))
}

try {
  require.resolve('@statusfy/core')
} catch (err) {
  packageError('@statusfy/core')
  process.exit(1)
}

try {
  require.resolve('@statusfy/editor')
} catch (err) {
  packageError('@statusfy/editor')
  process.exit(1)
}

const pkg = require('@statusfy/core/package.json')
const requiredVersion = pkg.engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `Minimum Node version not met:\n` +
    `You are using Node ${process.version}, ` +
    `but Statusfy requires Node ${requiredVersion}.`
  ))
  console.log(chalk.red(`Please upgrade your Node version.`))

  process.exit(1)
}

const { init, dev, build, generate, start, newIncident } = require('@statusfy/core/lib')
const sourceDir = path.resolve('.')

program
  .version(pkg.version)
  .usage('<command> [options]')

program
  .command('init')
  .description('Install a new version of Statusfy')
  .option('-d, --dir <outDir>', 'specify the installation directory')
  .action(({ dir }) => {
    const outDir = dir ? path.resolve(dir) : null
    wrapCommand(init)(sourceDir, { outDir })
  })

program
  .command('dev')
  .description('Starts the application in development mode (hot-code reloading, error reporting, etc.).')
  .option('-p, --port <port>', 'use specified port (default: 3000)')
  .option('-s, --ssr', 'force SSR')
  .action(({ port, ssr }) => {
    wrapCommand(dev)(sourceDir, { port, ssr })
  })

program
  .command('build')
  .description('Compiles the application for production deployment')
  .option('-a, --analyze', 'launch final bundle analysis')
  .action(({ analyze }) => {
    wrapCommand(build)(sourceDir, { analyze })
  })

program
  .command('generate')
  .description('Generate a static web application (server-rendered)')
  .option('-d, --dest <outDir>', 'specify generate output dir (default: ./dist)')
  .option('-a, --analyze', 'launch final bundle analysis')
  .action(({ dest, analyze }) => {
    const outDir = dest ? path.resolve(dest) : null
    wrapCommand(generate)(sourceDir, { outDir, analyze })
  })

program
  .command('start')
  .description(`Starts the application in production mode. The application should be compiled with ${chalk.cyan(`statusfy build`)} first.`)
  .option('-p, --port <port>', 'use specified port (default: 3000)')
  .option('-H, --host <host>', 'use specified host (default: 127.0.0.1)')
  .action(({ host, port }) => {
    wrapCommand(start)(sourceDir, { host, port })
  })

program
  .command('new-incident')
  .description(`Creates a new incident answering a few questions.`)
  .action(() => {
    wrapCommand(newIncident)(sourceDir, { })
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
