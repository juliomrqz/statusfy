const fs = require('fs')
const template = require('lodash/template')
const inquirer = require('inquirer')
const localeCode = require('locale-code')
const { chalk, logger, fse, tomlify, yaml, slugify, path } = require('@statusfy/common')

const pkg = require('../package.json')
const configTemplate = template(fs.readFileSync(path.join(__dirname, 'init', 'template-config.json.tpl'), 'utf-8'))
const packageTemplate = template(fs.readFileSync(path.join(__dirname, 'init', 'template-package.json.tpl'), 'utf-8'))

module.exports = async function generate (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'production'

  logger.start('Starting installation')

  const outDir = cliOptions.outDir || sourceDir
  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Title of the Website',
      validate: (value) => {
        if (value.length > 0) {
          return true
        }

        return 'You must have a Website Title!'
      }
    },
    {
      type: 'input',
      name: 'description',
      message: `Description of the Website. ${chalk.yellow('(recommended)')}`
    },
    {
      type: 'input',
      name: 'lang',
      default: 'en-US',
      message: `Code of the Default Language ${chalk.yellow('(e.g. en-US)')}`,
      validate: (value) => {
        if (localeCode.validateLanguageCode(value)) {
          return true
        }

        return `You must define a valid language code.\n   See the valid language identifiers at ${chalk.yellow('http://www.i18nguy.com/unicode/language-identifiers.html')}`
      }
    },
    {
      type: 'list',
      name: 'incidentFormat',
      default: 'yaml',
      message: 'Default Front Matter format for your Incidents',
      choices: [
        '(none)',
        'yaml',
        'toml',
        'json'
      ]
    },
    {
      type: 'list',
      name: 'configFormat',
      default: 'javascript',
      message: 'Format of the main Config file',
      choices: [
        'javascript',
        'yaml',
        'toml'
      ]
    }
  ]

  // Avoid overwrite user files
  const checkFiles = [
    'package.json',
    'config.js',
    'config.yml',
    'config.toml'
  ]

  checkFiles.forEach(file => {
    if (fs.existsSync(path.join(outDir, file))) {
      logger.error('Make sure your destination directory is empty.', outDir)
      process.exit(0)
    }
  })

  // Prompt questions
  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
    logger.warn('Remember to make sure your destination directory is empty.')
  }

  logger.info('Please answer the following questions:')

  inquirer.prompt(questions).then((answers) => {
    const languageInfo = localeCode.getLanguages([answers.lang])[0]
    const config = JSON.parse(configTemplate({
      options: {
        title: answers.title,
        name: slugify(answers.title),
        description: answers.description,
        language: {
          code: languageInfo.code.split('-')[0],
          iso: languageInfo.code,
          name: languageInfo.nativeName
        },
        frontMatterFormat: answers.incidentFormat === '(none)' ? null : answers.incidentFormat
      }
    }))

    /* Write files */
    // Main Config
    let configContent
    let configPath
    switch (answers.configFormat) {
    case 'javascript':
      configContent = `module.exports = ${JSON.stringify(config, null, '  ')}`
      configPath = path.join(outDir, 'config.js')
      break

    case 'yaml':
      configContent = yaml.safeDump(config)
      configPath = path.join(outDir, 'config.yml')
      break

    case 'toml':
      configContent = tomlify.toToml(config, { space: 2 })
      configPath = path.join(outDir, 'config.toml')
      break

    default:
      break
    }

    fse.outputFileSync(configPath, configContent)

    // Default locale
    fse.copySync(
      path.join(__dirname, 'init', 'README-locales.md'),
      path.join(outDir, 'locales', 'README.md')
    )
    fse.outputJsonSync(
      path.join(outDir, 'locales', `${config.defaultLocale}.json`),
      {
        title: config.title,
        description: config.description
      },
      { spaces: '  ' }
    )

    // Content directory
    fse.copySync(
      path.join(__dirname, 'init', 'README-content.md'),
      path.join(outDir, 'content', 'README.md')
    )

    // package.json
    fse.outputJsonSync(
      path.join(outDir, 'package.json'),
      JSON.parse(packageTemplate({
        options: {
          name: config.name,
          description: config.description,
          statusfyVersion: pkg.version
        }
      })),
      { spaces: '  ' }
    )

    // .gitignore
    fse.copySync(
      path.join(__dirname, 'init', '_gitignore'),
      path.join(outDir, '.gitignore')
    )

    logger.success(`A new version of Statusfy was successfully created at ${chalk.cyan(outDir)}`)
  })
}
