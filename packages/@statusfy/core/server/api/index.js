const { Router } = require("express");

const buildIncidentsRouter = require("./incidents");
const buildSystemsRouter = require("./systems");
const buildScheduledRouter = require("./scheduled");

const buildRouter = siteConfig => {
  const router = Router();

  // Add Routes
  router.use(buildIncidentsRouter(siteConfig));
  router.use(buildSystemsRouter(siteConfig));
  router.use(buildScheduledRouter(siteConfig));

  return router;
};

module.exports = buildRouter;
