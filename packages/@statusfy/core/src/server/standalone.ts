import { path } from "@statusfy/common/src";

import { loadConfig } from "@statusfy/config/src/load"
import { createServer } from "./index"

const sourceDir = path.join(__dirname, "..", "demo");
const siteConfig = loadConfig(sourceDir);
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT) || 3000;

async function start() {
  await createServer(siteConfig.config, null, host, port);
}
start();
