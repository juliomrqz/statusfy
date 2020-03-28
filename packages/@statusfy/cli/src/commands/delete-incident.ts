import inquirer, { QuestionCollection } from "inquirer"

import { loadConfig } from "../utils";
import { path, logger, fse } from "@statusfy/common/src";
import { getIncidentsFromProject } from '../functions'

import { Incident } from '../interfaces'

interface Prompt {
  incident: Incident;
  confirm: Boolean;
}

export default async function deleteIncident(sourceDir: string) {
  process.env.NODE_ENV = "development";

  const config = loadConfig(sourceDir).config;
  const contentDir = path.join(sourceDir, config.content.dir);
  const incidentsList = await getIncidentsFromProject(contentDir);

  const questions: QuestionCollection<Prompt> = [
    {
      type: "list",
      name: "incident",
      message: "What incident do you want to delete?",
      paginated: true,
      choices: incidentsList
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure you want to delete the incident?",
      default: false
    }
  ];

  inquirer.prompt<Prompt>(questions).then(async answers => {
    const { incident, confirm } = answers;

    try {
      if (confirm) {
        const locales = config.locales.map(l => l.code);
        const deletedFiles = [];

        for (let j = 0; j < locales.length; j++) {
          const locale = locales[j];
          const localeIncidentPath = path.join(
            contentDir,
            config.defaultLocale !== locale ? locale : "",
            incident.name
          );
          const exists = await fse.pathExists(localeIncidentPath);

          if (exists) {
            try {
              await fse.remove(localeIncidentPath);
              deletedFiles.push(localeIncidentPath);
            } catch (error) {
              logger.error(error);
            }
          } else {
            logger.warn(`This file couldn't be found:\n${localeIncidentPath}`);
          }
        }

        if (deletedFiles.length > 0) {
          const prefix =
            deletedFiles.length === 1
              ? "This file was successfully deleted"
              : "These files were successfully deleted";

          logger.success(`${prefix}: \n${deletedFiles.join("\n")}`);
        }
      }
    } catch (error) {
      logger.fatal(error);
    }
  });
};
