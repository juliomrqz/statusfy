import { Router } from "express"

import createDatabase from "../../content/database"
import response from "../utils/response"
import request from "../utils/request"

import { ConfigFile } from "@statusfy/config/src/interfaces";

export default (siteConfig: ConfigFile) => {
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
