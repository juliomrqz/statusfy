const { Router } = require("express");

const createDatabase = require("../../lib/content/database");
const response = require("../utils/response");
const request = require("../utils/request");

const buildRouter = siteConfig => {
  const router = Router();
  const systemsPath = siteConfig.build.isStatic
    ? "/systems.:lang.json"
    : "/systems";

  router.get(systemsPath, async (req, res, next) => {
    const { language, siteConfig } = request(req);
    const send = response(res, language);

    try {
      const database = await createDatabase(siteConfig);

      send.json(database.systems(language));
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = buildRouter;
