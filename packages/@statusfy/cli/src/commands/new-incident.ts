import fs from "fs"
import inquirer, { QuestionCollection } from "inquirer";
import opener from "opener";

import { generateIncident } from '../functions'
import { loadConfig } from "../utils";
import { logger, fse, slugify, path, Dates } from "@statusfy/common/src";

interface Prompt {
  title: string;
  severity: "under-maintenance" | "degraded-performance" | "partial-outage" | "major-outage";
  affected: string;
  description: string;
  open: boolean;
}

const dates = Dates();

export default async function newIncident(sourceDir: string) {
  process.env.NODE_ENV = "development";

  // Generate configuration
  const config = loadConfig(sourceDir).config;

  const questions: QuestionCollection<Prompt> = [
    {
      type: "input",
      name: "title",
      message: "What is the cause of the incident?",
      validate: (value: string) => {
        if (value.length > 0) {
          return true;
        }

        return "You must have a cause title!";
      }
    },
    {
      type: "list",
      name: "severity",
      message: "What is the severity of the incident?",
      choices: [
        "under-maintenance",
        "degraded-performance",
        "partial-outage",
        "major-outage"
      ]
    },
    {
      type: "checkbox",
      name: "affected",
      message: "What are the affected systems?",
      choices: config.content.systems,
      validate: (value: string) => {
        if (value.length > 0) {
          return true;
        }

        return "You must have an affected system!";
      }
    },
    {
      type: "input",
      name: "description",
      message: "Add a concise description of the incident."
    },
    {
      type: "confirm",
      name: "open",
      message: "Open the incident for editing?",
      default: false
    }
  ];

  logger.start("Create New Incident");

  inquirer.prompt<Prompt>(questions).then(answers => {
    const date: string = dates.parse().toISOString();
    const frontMatter = {
      title: answers.title,
      date,
      severity: answers.severity,
      affectedsystems: answers.affected,
      resolved: false
    };

    const content = generateIncident(
      frontMatter,
      answers.description,
      config.content.frontMatterFormat
    );

    try {
      const fileName = `${date.split("T")[0]}_${slugify(answers.title, "-")}`;
      const createdFiles: string[] = [];
      let error = false;

      config.locales.forEach(locale => {
        const contentPath = path.join(sourceDir, config.content.dir);
        let filePath;

        if (locale.code === config.defaultLocale) {
          filePath = path.join(contentPath, fileName + ".md");
        } else {
          filePath = path.join(contentPath, locale.code, fileName + ".md");
        }

        if (fs.existsSync(filePath)) {
          logger.error(`An incident with a similar title already exists.\n${filePath}`);
          error = true;
        } else {
          fse.outputFileSync(filePath, `${content}\n<!--- language code: ${locale.code} -->\n`);

          createdFiles.push(path.relative(contentPath, filePath));

          if (answers.open) {
            opener(filePath);
          }
        }
      });

      if (!error) {
        logger.success(`The Incident was successfully created.\n${createdFiles.join("\n")}`);
      } else {
        logger.warn("There was an issue in creating the Incident.");
      }
    } catch (error) {
      logger.fatal(error);
    }
  });
};
