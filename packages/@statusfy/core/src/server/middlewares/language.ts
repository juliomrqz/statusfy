import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  const siteConfig = req.app.get("siteConfig");
  const allowedLanguages = siteConfig.locales.map(locale => locale.code);
  const { defaultLocale } = siteConfig;
  let language;

  try {
    if (allowedLanguages.includes(req.headers["accept-language"])) {
      language = req.headers["accept-language"];
    } else {
      language = defaultLocale;
    }

    req.app.set("language", language);
  } catch (error) {
    next(error);
  }

  return next();
};
