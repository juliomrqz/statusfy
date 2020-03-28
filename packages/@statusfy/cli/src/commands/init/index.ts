import fs from "fs"
import inquirer, { QuestionCollection } from "inquirer"
import localeCode from "locale-code"
import template from "lodash/template"

import { chalk, logger, fse, tomlify, yaml, slugify, path } from "@statusfy/common/src";
import pkg from "../../../package.json"

interface Prompt {
  title: string;
  description: string;
  lang: string;
  incidentFormat: "yaml" | "toml" | "json";
  configFormat: "javascript" | "yaml" | "toml";
  packageManager: "npm" | "yarn";
}

const configTemplate = template(require("./template-config.json.tpl.js"));
const packageTemplate = template(require("./template-package.json.tpl.js"));

export default async (sourceDir: string, cliOptions: { outDir?: string } = {}) => {
  process.env.NODE_ENV = "production";

  logger.start("Starting installation");

  const outDir = cliOptions.outDir || sourceDir;
  const questions: QuestionCollection<Prompt> = [
    {
      type: "input",
      name: "title",
      message: "Title of the Website",
      validate: (value: string) => {
        if (value.length > 0) {
          return true;
        }

        return "You must have a Website Title!";
      }
    },
    {
      type: "input",
      name: "description",
      message: `Description of the Website. ${chalk.yellow("(recommended)")}`
    },
    {
      type: "input",
      name: "lang",
      default: "en-US",
      message: `Code of the Default Language ${chalk.yellow("(e.g. en-US)")}`,
      validate: (value: string) => {
        if (localeCode.validateLanguageCode(value)) {
          return true;
        }

        return `You must define a valid language code.\n   See the valid language identifiers at ${chalk.yellow("http://www.i18nguy.com/unicode/language-identifiers.html")}`;
      }
    },
    {
      type: "list",
      name: "incidentFormat",
      default: "yaml",
      message: "Default Front Matter format for your Incidents",
      choices: ["yaml", "toml", "json"]
    },
    {
      type: "list",
      name: "configFormat",
      default: "javascript",
      message: "Format of the main Config file",
      choices: ["javascript", "yaml", "toml"]
    },
    {
      type: "list",
      name: "packageManager",
      default: "npm",
      message: "Choose a package manager",
      choices: ["npm", "yarn"]
    }
  ];

  // Avoid overwrite user files
  const checkFiles = ["package.json", "config.js", "config.yml", "config.toml"];

  checkFiles.forEach(file => {
    if (fs.existsSync(path.join(outDir, file))) {
      logger.error(`Make sure your destination directory is empty.\n${outDir}`);
      process.exit(0);
    }
  });

  // Prompt questions
  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
    logger.warn("Remember to make sure your destination directory is empty.");
  }

  logger.info("Please answer the following questions:");

  const answers = await inquirer.prompt<Prompt>(questions)
  const languageInfo = localeCode.getLanguages([answers.lang])[0];
  const config = JSON.parse(
    configTemplate({
      options: {
        title: answers.title,
        name: slugify(answers.title),
        description: answers.description,
        language: {
          code: languageInfo.code.split("-")[0],
          iso: languageInfo.code,
          name: languageInfo.nativeName
        },
        frontMatterFormat: answers.incidentFormat
      }
    })
  );

  /* Write files */
  // Main Config
  let configContent;
  let configPath = './';

  if (answers.configFormat === "javascript") {
    configContent = `module.exports = ${JSON.stringify(config, null, "  ")}`;
    configPath = path.join(outDir, "config.js");
  } else if (answers.configFormat === "yaml") {
    configContent = yaml.stringify(config);
    configPath = path.join(outDir, "config.yml");
  } else if (answers.configFormat === "toml") {
    configContent = tomlify.toToml(config, { space: 2 });
    configPath = path.join(outDir, "config.toml");
  }

  await fse.outputFile(configPath, configContent);

  // Default locale
  await fse.outputFile(path.join(outDir, "locales", "README.md"), require("./README-locales.md.tpl.js"))

  await fse.outputJson(
    path.join(outDir, "locales", `${config.defaultLocale}.json`),
    {
      title: config.title,
      description: config.description
    },
    { spaces: "  " }
  );

  // Content directory
  await fse.outputFile(path.join(outDir, "content", "README.md"), require("./README-content.md.tpl.js"))

  // package.json
  await fse.outputJson(
    path.join(outDir, "package.json"),
    JSON.parse(
      packageTemplate({
        options: {
          name: config.name,
          description: config.description,
          statusfyVersion: pkg.version
        }
      })
    ),
    { spaces: "  " }
  );

  // .gitignore
  await fse.copy(path.join(__dirname, "_gitignore"), path.join(outDir, ".gitignore"));

  logger.success(`A new project of Statusfy was successfully created at ${chalk.cyan(outDir)}`);
  logger.warn(`Remember to run ${chalk.cyan(`${answers.packageManager} install`)}`);
};
