import { Request, Response } from "express"
import { ConfigFile } from "@statusfy/config/src/interfaces";

import createSitemap from "../../content/sitemap";

export default async (req: Request, res: Response) => {
  const siteConfig: ConfigFile = req.app.get("siteConfig");
  const sitemap = await createSitemap(siteConfig);

  res.header("Content-Type", "application/xml");
  res.send(sitemap.toString());
};
