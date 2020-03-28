import { Request } from "express"

export default (req: Request) => {
  const language = req.params.lang || req.app.get("language");
  const page = req.query.page || req.params.lang || 1;

  return {
    language,
    page,
    siteConfig: req.app.get("siteConfig")
  };
};
