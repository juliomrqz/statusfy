import { createApp } from "./server/app"
import { generateConfig } from "@statusfy/config/src/generate"

export async function Statufy(sourceDir: string, port: string, host: string) {
  // Generate configuration
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, { host, port });

  // Create app
  const app = await createApp(siteConfig, nuxtConfig, host, port);

  return app;
};
