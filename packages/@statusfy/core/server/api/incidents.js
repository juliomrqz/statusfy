const { Router } = require("express");

const createDatabase = require("../../lib/content/database");
const response = require("../utils/response");
const request = require("../utils/request");

const buildRouter = siteConfig => {
  const router = Router();
  const incidentsPath = siteConfig.build.isStatic
    ? "/incidents.page-:page.:lang.json"
    : "/incidents";
  const incidentsHistoryPath = siteConfig.build.isStatic
    ? "/incidents/history.page-:page.:lang.json"
    : "/incidents/history";
  const incidentTimelinePath = siteConfig.build.isStatic
    ? "/incidents/timeline.:lang.json"
    : "/incidents/timeline";
  const incidentPath = siteConfig.build.isStatic
    ? "/incidents/:id.:lang.json"
    : "/incidents/:id";

  router.get(incidentsPath, async (req, res, next) => {
    const { language, page, siteConfig } = request(req);
    const send = response(res, language);

    try {
      const database = await createDatabase(siteConfig);
      const data = database.incidents(language, Number(page));

      if (data.page > data.total_pages) {
        send.notFound();
      } else {
        send.json(data);
      }
    } catch (error) {
      next(error);
    }
  });

  router.get(incidentsHistoryPath, async (req, res, next) => {
    const { language, page, siteConfig } = request(req);
    const send = response(res, language);

    try {
      const database = await createDatabase(siteConfig);
      const data = database.incidentsHistory(language, Number(page));

      if (data.count === 0) {
        send.json(data);
      } else if (data.page > data.total_pages) {
        send.notFound();
      } else {
        send.json(data);
      }
    } catch (error) {
      next(error);
    }
  });

  router.get(incidentTimelinePath, async (req, res, next) => {
    const { language, siteConfig } = request(req);
    const send = response(res, language);

    try {
      const database = await createDatabase(siteConfig);

      send.json(database.incidentsTimeline(language));
    } catch (error) {
      next(error);
    }
  });

  router.get(incidentPath, async (req, res, next) => {
    const { id } = req.params;
    const { language, siteConfig } = request(req);
    const send = response(res, language);

    try {
      const database = await createDatabase(siteConfig);
      const incident = database.incident(id, language);

      if (incident) {
        send.json(database.incident(id, language));
      } else {
        send.notFound("Incident not found.");
      }
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = buildRouter;
