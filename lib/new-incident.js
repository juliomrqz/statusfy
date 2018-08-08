const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const toml = require('toml')
const tomlify = require('tomlify-j0.4')
const matter = require('gray-matter')
const slugify = require('slugify')
const opener = require('opener')

const logger = require('./utils/logger')
const loadConfig = require('./config/load')

function generateIncident (frontMatter, content, format) {
  let matterContent = matter.stringify(
    content,
    frontMatter, {
      excerpt: false,
      language: format,
      engines: {
        toml: {
          parse: toml.parse.bind(toml),
          stringify: tomlify.toToml.bind(tomlify)
        }
      }
    })

  if (['json', 'toml'].includes(format)) {
    matterContent = matterContent.replace(/^---/, `---${format}`)
  }

  return matterContent
}

module.exports = async function newIncident (sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = 'development'

  // Generate configuration
  const config = loadConfig(sourceDir)

  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the cause of the incident?',
      validate: (value) => {
        if (value.length > 0) {
          return true
        }

        return 'You must have a cause title!'
      }
    },
    {
      type: 'list',
      name: 'severity',
      message: 'What is the severity of the incident?',
      choices: [
        'under-maintenance',
        'degraded-performance',
        'partial-outage',
        'major-outage'
      ]
    },
    {
      type: 'checkbox',
      name: 'affected',
      message: 'What are the affected systems?',
      choices: config.contentConfig.systems,
      validate: (value) => {
        if (value.length > 0) {
          return true
        }

        return 'You must have an affected system!'
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Add a concise description of the incident.'
    },
    {
      type: 'confirm',
      name: 'open',
      message: 'Open the incident for editing?',
      default: false
    }
  ]

  if (!config.contentConfig.frontMatterFormat) {
    questions.unshift({
      type: 'list',
      name: 'format',
      default: 'yaml',
      message: 'What is the format of the Front Matter of the Incident?',
      choices: [
        'yaml',
        'toml',
        'json'
      ]
    })
  }

  logger.start('Create New Incident')

  inquirer.prompt(questions).then((answers) => {
    const date = new Date().toISOString()
    const frontMatter = {
      title: answers.title,
      date,
      severity: answers.severity,
      affectedsystems: answers.affected,
      resolved: false
    }

    const content = generateIncident(
      frontMatter,
      answers.description,
      config.contentConfig.frontMatterFormat || answers.format
    )

    try {
      const fileName = `${date.split('T')[0]}_${slugify(answers.title, {replacement: '-', lower: true})}`
      const createdFiles = []
      let error = false

      config.locales.forEach(locale => {
        const contentPath = path.join(sourceDir, config.contentConfig.dir)
        let filePath

        if (locale.code === config.defaultLocale) {
          filePath = path.join(contentPath, fileName + '.md')
        } else {
          filePath = path.join(contentPath, locale.code, fileName + '.md')
        }

        if (fs.existsSync(filePath)) {
          logger.error('An incident with a similar title already exists.', filePath)
          error = true
        } else {
          fse.outputFileSync(filePath, `${content}\n<!--- language code: ${locale.code} -->\n`)

          createdFiles.push(path.relative(contentPath, filePath))

          if (answers.open) {
            opener(filePath)
          }
        }
      })

      if (!error) {
        logger.success('The Incident was successfully created.', createdFiles.join('\n'))
      } else {
        logger.warn('There was an issue in creating the Incident.')
      }
    } catch (error) {
      logger.fatal(error)
    }
  })
}
