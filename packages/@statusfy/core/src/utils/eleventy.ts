// @ts-ignore
import _Eleventy from '@11ty/eleventy/src/Eleventy';
// @ts-ignore
import EleventyCommandCheck from '@11ty/eleventy/src/EleventyCommandCheck';

import { path, logger, esm } from "@statusfy/common/src";
import { ConfigFile } from "@statusfy/config/src/interfaces";

interface Arguments {
  input: string;
  output: string;
  quiet: boolean | null;
  config: string;
}

interface EleventyInstance {
  init: () => Promise<void>;
  watch: () => Promise<void>;
  serve: (port: number) => void;
  write: () => Promise<{}>;
}

const Eleventy: typeof _Eleventy = esm('@11ty/eleventy')

const debugLogger = {
  log(message: string) {
    logger.debug(message)
  }
}

// mute eleventy logs
console.log = logger.debug;

export function getEleventy(config: ConfigFile, internalDirPath: string): EleventyInstance {
  const outputPath = path.join(internalDirPath, './dist')

  function relative(dest: string): string {
    return path.relative(`${config.sourceDir}`, dest)
  }

  const argv: Arguments = {
    input: relative(internalDirPath),
    output: relative(outputPath),
    quiet: true,
    config: relative(path.join(internalDirPath, '.eleventy.js'))
  }

  if (process.env.DEBUG) {
    argv.quiet = false
  }

  const cmdCheck = new EleventyCommandCheck(argv);
  cmdCheck.hasUnknownArguments();

  const elev = new Eleventy(argv.input, argv.output);

  elev.setConfigPathOverride(argv.config)
  elev.setLogger(debugLogger)
  // TODO: re-support base url
  elev.setPathPrefix('');

  elev.setIsVerbose(!argv.quiet);

  return elev
}
