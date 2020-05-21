import { logger, fse, slugify, path, Dates } from "@statusfy/common/src";
import { ConfigFile } from "@statusfy/config/src/interfaces";

export async function prepareBaseTemplate(config: ConfigFile) {
  const internalDirPath = path.join(config.sourceDir, './.statusfy')

  // empty internal dir
  await fse.emptyDir(internalDirPath)

  // copy application template
  await fse.copy(
    path.join(__dirname, '../../template'),
    internalDirPath,
    {
      preserveTimestamps: true
    }
  )
}
