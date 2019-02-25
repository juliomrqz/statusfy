const defaultsDeep = require("lodash/defaultsDeep");

const {
  logger,
  fse,
  chalk,
  toml,
  yaml,
  slugify,
  path
} = require("@statusfy/common");
const defaultConfig = require("./default");
const validateConfig = require("./validate");

function parseConfig(filePath) {
  const extension = path.extname(filePath);
  let data;

  logger.info(
    `Reading configuration from ${chalk.yellow(`config${extension}`)}`
  );

  if (extension !== ".js") {
    const content = fse.readFileSync(filePath, "utf-8");

    if (extension === ".yml") {
      data = yaml.parse(content);
    } else if (extension === ".toml") {
      data = toml.parse(content);
    }
  } else {
    data = require(filePath);
  }

  return data || {};
}

module.exports = function loadConfig(sourceDir) {
  const configFiles = ["config.yml", "config.toml", "config.js"];
  let configContent = {};
  let errors = [];

  // resolve configContent
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

  const config = defaultsDeep(configContent, defaultConfig);
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
    logger.error(error);
    process.exit(1);
  }

  return {
    config,
    errors
  };
};
