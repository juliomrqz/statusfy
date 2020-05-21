// @ts-ignore
import _Eleventy from '@11ty/eleventy';
// @ts-ignore
import EleventyCommandCheck from '@11ty/eleventy/src/EleventyCommandCheck';

import { path, logger, esm } from "@statusfy/common/src";
import { ConfigFile } from "@statusfy/config/src/interfaces";

interface Arguments {
  input: string;
  output: string;
  quiet: boolean | null;
}

const Eleventy: _Eleventy = esm('@11ty/eleventy')

const debugLogger = {
  log(message: string) {
    logger.debug(message)
  }
}

// mute eleventy logs
console.log = logger.debug;

export function getEleventy(config: ConfigFile, internalDirPath: string): _Eleventy {
  const outputPath = path.join(internalDirPath, './dist')

  const argv: Arguments = {
    input: internalDirPath,
    output: outputPath,
    quiet: true,
  }

  if (process.env.DEBUG) {
    argv.quiet = false
  }

  const cmdCheck = new EleventyCommandCheck(argv);
  cmdCheck.hasUnknownArguments();

  const elev = new Eleventy(argv.input, argv.output);

  elev.setIsVerbose(!argv.quiet);
  elev.setLogger(debugLogger)
  // TODO: re-support base url
  elev.setPathPrefix('');

  return elev
}
