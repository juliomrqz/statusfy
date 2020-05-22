import { loadConfig } from "@statusfy/config/src/load"
import { fse, logger, path, ora } from "@statusfy/common/src";

import { getEleventy } from "./utils/eleventy";
import { prepareBaseTemplate } from "./utils/template";

export async function generate(sourceDir: string, options: { outDir?: string }) {
  process.env.NODE_ENV = "production";

  logger.start("Generate a static web application");

  // Generate configuration
  const config = loadConfig(sourceDir).config;
  const internalDirPath = path.join(config.sourceDir, './.statusfy')
  const destDir = options.outDir ? options.outDir : path.resolve(sourceDir, './dist')

  const spinner = ora('Creating an optimized production build...').start();

  await prepareBaseTemplate(config)

  const elev = getEleventy(config, internalDirPath)

  try {
    await elev.init()
    await elev.watch()

    await elev.write()

    await fse.emptyDir(destDir)
    await fse.copy(path.join(internalDirPath, './dist'), destDir)

    spinner.succeed('The application was successfully generated')

    process.exit(0)
  } catch (error) {
    // console.error(error)

    spinner.fail('The project could not be generated')
    logger.error(error)

    process.exit(1)
  }
}
