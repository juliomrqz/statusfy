import { loadConfig } from "@statusfy/config/src/load"
import { logger, path, chalk, getPort, ora } from "@statusfy/common/src";

import { getEleventy } from "./utils/eleventy";
import { prepareBaseTemplate } from "./utils/template";

export async function start(sourceDir: string, options: { port?: string }) {
  process.env.NODE_ENV = "development";

  logger.start("Start the application in development mode");

  // Generate configuration
  const config = loadConfig(sourceDir).config;
  const internalDirPath = path.join(config.sourceDir, './.statusfy')

  const spinner = ora('Preparing project for development...').start();

  await prepareBaseTemplate(config)

  const elev = getEleventy(config, internalDirPath)
  const port: number = options.port ? Number(options.port) : (await getPort())

  try {
    await elev.init()
    await elev.watch()

    elev.serve(port)

    spinner.succeed('Project ready')

    logger.info(`Listening on: ${chalk.cyan(`http://localhost:${port}`)}`)
  } catch (error) {
    // console.error(error)

    spinner.fail('The project could not be initialized')
    logger.error(error)

    process.exit(1)
  }
}
