const { Router } = require("express");
const router = Router();

const createCalendar = require("../../lib/content/calendar");

router.get("/calendars/scheduled.:lang.ics", async (req, res, next) => {
  const siteConfig = req.app.get("siteConfig");

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

module.exports = router;
