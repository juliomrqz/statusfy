// @ts-ignore
import _loadConfig from "@statusfy/core/lib/config/load"

import { ConfigFile } from './interfaces'

export const loadConfig: (sourceDir: string) => { config: ConfigFile; errors: string[] } = _loadConfig
