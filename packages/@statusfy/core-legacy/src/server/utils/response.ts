import { Response } from "express"

export default (res: Response, lang: string) => ({
  json(data) {
    res.setHeader("Content-Language", lang);
    res.json(data);
  },
  notFound(message = "Not Found") {
    res.setHeader("Cache-Control", "no-cache");
    res.status(404).json({
      message
    });
  }
});
