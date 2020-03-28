import { Router } from "express"
const router = Router();

import { ConfigFile } from "@statusfy/config/src/interfaces";
import createFeeds from "../../content/feeds";

router.get("/feeds/incidents.:lang.:ext", async (req, res, next) => {
  const siteConfig: ConfigFile = req.app.get("siteConfig");

  if (!siteConfig.notifications || !siteConfig.notifications.feeds) {
    next();
  }

  const { lang, ext } = req.params;

  try {
    const feeds = await createFeeds(siteConfig, lang);

    if (ext === "xml") {
      res.set("Content-Type", "application/rss+xml");
      return res.send(feeds.rss());
    } else if (ext === "atom") {
      res.set("Content-Type", "application/atom+xml");
      return res.send(feeds.atom());
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

export default router;
