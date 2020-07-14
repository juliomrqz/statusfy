import defaultsDeep from "lodash/defaultsDeep"
import { logger, fse, chalk, toml, yaml, slugify, path, esm } from "@statusfy/common/src";

import { defaultConfig } from "./default";
import { validateConfig } from "./validate";
import { ConfigFile } from "./interfaces";

function parseConfig(filePath: string): ConfigFile {
  const extension = path.extname(filePath);
  let data;

  logger.info(`Reading configuration from ${chalk.yellow(`config${extension}`)}`);

  if (extension !== ".js") {
    const content = fse.readFileSync(filePath, "utf-8");

    if (extension === ".yml") {
      data = yaml.parse(content);
    } else if (extension === ".toml") {
      data = toml.parse(content);
    }
  } else {
    data = esm(filePath);

    if ('default' in data) {
      data = data.default
    }
  }

  return data || {};
}

export function loadConfig(sourceDir: string): { config: ConfigFile, errors: string[] } {
  const configFiles = ["config.yml", "config.toml", "config.js"];
  // @ts-ignore
  let configContent: ConfigFile = {};
  let errors: string[] = [];

  // resolve configContent
  // eslint-disable-next-line no-unused-vars
  for (const configFile of configFiles) {
    const configPath = path.join(sourceDir, configFile);

    if (fse.existsSync(configPath)) {
      configContent = parseConfig(configPath);
      break;
    }
  }

  // Replace user's systems
  if (configContent.content && configContent.content.systems) {
    defaultConfig.content.systems = configContent.content.systems;
  }

  // Replace user's locales
  if (configContent.locales) {
    defaultConfig.locales = configContent.locales;
  }

  const config: ConfigFile = defaultsDeep(configContent, defaultConfig);
  config.sourceDir = sourceDir;

  if (!config.name) {
    config.name = slugify(config.title);
  }

  if (!config.short_title) {
    config.short_title = config.title;
  }

  // Run Validation
  try {
    errors = validateConfig(config);
  } catch (error) {
    logger.fatal(error);
    // process.exit(1);
  }

  return {
    config,
    errors
  };
};
