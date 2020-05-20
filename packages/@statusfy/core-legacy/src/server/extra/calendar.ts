import { Router } from "express"
const router = Router();

import { ConfigFile } from "@statusfy/config/src/interfaces";
import createCalendar from "../../content/calendar";

router.get("/calendars/scheduled.:lang.ics", async (req, res, next) => {
  const siteConfig: ConfigFile = req.app.get("siteConfig");

  if (!siteConfig.notifications || !siteConfig.notifications.icalendar) {
    next();
  }

  const { lang } = req.params;

  try {
    const ics = await createCalendar(siteConfig, lang);

    res.set("Content-Type", "text/calendar");
    return res.send(ics);
  } catch (error) {
    next(error);
  }
});

export default router;
