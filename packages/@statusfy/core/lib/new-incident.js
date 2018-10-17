const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const opener = require('opener')

const { logger, fse, frontMatter, slugify } = require('@statusfy/common')
const loadConfig = require('./config/load')

function generateIncident (data, content, format) {
  let matterContent = frontMatter.stringify(content, data, format)

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
      choices: config.content.systems,
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

  if (!config.content.frontMatterFormat) {
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
      config.content.frontMatterFormat || answers.format
    )

    try {
      const fileName = `${date.split('T')[0]}_${slugify(answers.title, '-')}`
      const createdFiles = []
      let error = false

      config.locales.forEach(locale => {
        const contentPath = path.join(sourceDir, config.content.dir)
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
