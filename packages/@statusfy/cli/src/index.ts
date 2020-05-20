import { program } from 'commander'
import satisfies from 'semver/functions/satisfies'
import { path, chalk } from "@statusfy/common/src";

import init from './commands/init'
import newIncident from './commands/new-incident'
import deleteIncident from './commands/delete-incident'
import updateIncident from './commands/update-incident'

function packageError(name: string, err: Error) {
  console.log(chalk.red(
    `\n[statusfy] @statusfy/cli ` +
    `requires ${name} to be installed.\n` +
    `${err}`
  ))
}

function checkCoreInstallation() {
  try {
    require.resolve('@statusfy/core')
  } catch (err) {
    packageError('@statusfy/core', err)
    process.exit(1)
  }
}

try {
  require.resolve('@statusfy/editor')
} catch (err) {
  packageError('@statusfy/editor', err)
  process.exit(1)
}

import pkg from '@statusfy/core/package.json'
const requiredVersion = pkg.engines.node

if (!satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `Minimum Node version not met:\n` +
    `You are using Node ${process.version}, ` +
    `but Statusfy requires Node ${requiredVersion}.`
  ))
  console.log(chalk.red(`Please upgrade your Node version.`))

  process.exit(1)
}

const { start, generate } = require('@statusfy/core/lib')
const sourceDir = path.resolve('.')

program
  .version(pkg.version)
  .usage('<command> [options]')

program
  .command('init')
  .description('Create a base project')
  .option('-d, --dir <outDir>', 'specify the installation directory')
  .action(({ dir }) => {
    const outDir = dir ? path.resolve(dir) : null
    wrapCommand(init)(sourceDir, { outDir })
  })

program
  .command('start')
  .description('Starts the application in development mode (hot-code reloading, error reporting, etc.).')
  .option('-p, --port <port>', 'use specified port (default: 3000)')
  .option('-s, --ssr', 'force SSR')
  .action(({ port, ssr }) => {
    checkCoreInstallation()

    wrapCommand(start)(sourceDir, { port, ssr })
  })

program
  .command('generate')
  .description('Generate a static web application (server-rendered)')
  .option('-d, --dest <outDir>', 'specify generate output dir (default: ./dist)')
  .option('-a, --analyze', 'launch the final bundle analysis')
  .action(({ dest, analyze }) => {
    checkCoreInstallation()

    const outDir = dest ? path.resolve(dest) : null
    wrapCommand(generate)(sourceDir, { outDir, analyze })
  })

program
  .command('new-incident')
  .description(`Creates a new incident after answering a few questions.`)
  .action(() => {
    wrapCommand(newIncident)(sourceDir, {})
  })

program
  .command('delete-incident')
  .description(`Delete an incident including translations.`)
  .action(() => {
    wrapCommand(deleteIncident)(sourceDir, {})
  })


program
  .command('update-incident')
  .description(`Update an incident including translations.`)
  .action(() => {
    wrapCommand(updateIncident)(sourceDir, {})
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

function wrapCommand(fn: Function) {
  return (...args: any[]) => {
    return fn(...args).catch((err: Error) => {
      console.error(chalk.red(err.stack))
      process.exitCode = 1
    })
  }
}
