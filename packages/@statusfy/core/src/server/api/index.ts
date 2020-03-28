import { Router } from "express";

import buildIncidentsRouter from "./incidents";
import buildSystemsRouter from "./systems";
import buildScheduledRouter from "./scheduled";

import { ConfigFile } from "@statusfy/config/src/interfaces";

export default (siteConfig: ConfigFile) => {
  const router = Router();

  // Add Routes
  router.use(buildIncidentsRouter(siteConfig));
  router.use(buildSystemsRouter(siteConfig));
  router.use(buildScheduledRouter(siteConfig));

  return router;
};
