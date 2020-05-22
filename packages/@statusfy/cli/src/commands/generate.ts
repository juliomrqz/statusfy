import { logger } from "@statusfy/common/src";

export default function generate(sourceDir: string, options?: { outDir?: string }): Promise<Function> {
  let generate: Function;

  try {
    generate = require('@statusfy/core/src/generate').generate
  } catch (error) {
    logger.error(error)

    generate = require('@statusfy/core/lib/generate').generate
  }

  return generate(sourceDir, options || {})
}
