import { program } from 'commander'
import satisfies from 'semver/functions/satisfies'
import { path, chalk } from "@statusfy/common/src";
import resolve from 'resolve-from';

import start from './commands/start'
import generate from './commands/generate'
import init from './commands/init'
import newIncident from './commands/new-incident'
import deleteIncident from './commands/delete-incident'
import updateIncident from './commands/update-incident'

import pkg from '../package.json'

const sourceDir = path.resolve('.')

function packageError(name: string) {
  let message = chalk.red(`\n[statusfy] @statusfy/cli requires ${name} to be installed in the Working Directory.\n\n`)
  message += chalk.cyan(`Working Directory: ${sourceDir}\n`)

  console.log(message)
}

function checkCoreInstallation() {
  try {
    const corePkgPath = resolve(sourceDir, '@statusfy/core/package.json')
    const corePkg: { [key: string]: string } = require(corePkgPath)

    if (!satisfies(pkg.version, corePkg.version)) {
      console.log(chalk.yellow(`The version of ${chalk.bold('@statusfy/cli')} and ${chalk.bold('statusfy')} don't match. This can lead to an unexpected behavior.\n`))

      console.log(chalk.yellow(`@statusfy/cli:  `) + chalk.cyan(pkg.version))
      console.log(chalk.yellow(`statusfy:       `) + chalk.cyan(corePkg.version) + "\n\n")
    }
  } catch (err) {
    const error: Error = err

    if (err.code === 'MODULE_NOT_FOUND') {
      packageError('statusfy')
    } else {
      console.error(error)
    }

    process.exit(1)
  }
}

// try {
//   require.resolve('@statusfy/editor')
// } catch (err) {
//   packageError('@statusfy/editor', err)
//   process.exit(1)
// }

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
  .action(({ port }) => {
    checkCoreInstallation()

    wrapCommand(start)(sourceDir, { port })
  })

program
  .command('generate')
  .description('Generate a static web application')
  .option('-d, --dest <outDir>', 'specify generate output dir (default: ./dist)')
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
