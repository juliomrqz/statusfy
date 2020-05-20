import { Feed } from "feed"
import { ConfigFile } from "@statusfy/config/src/interfaces";

import createDatabase from "./database"

const buildFeed = (database, siteConfig: ConfigFile, lang: string, isAtom = false) => {
  const prefix = lang === siteConfig.defaultLocale ? "" : `/${lang}`;
  const baseUrl = `${siteConfig.baseUrl}${prefix}`;

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: baseUrl,
    link: baseUrl,
    updated: new Date(),
    generator: "Statusfy",
    // TODO: fill this field
    copyright: '',
    feedLinks: {
      atom: `${siteConfig.baseUrl}/feeds/incidents.${lang}.${isAtom ? "atom" : "xml"}`
    }
  });

  const { incidents } = database.incidents(lang, 1, -1);

  incidents.forEach(incident => {
    const link = `${baseUrl}/incidents/${incident.id}`;

    feed.addItem({
      title: incident.title,
      id: link,
      link,
      description: incident.description,
      content: incident.content,
      date: new Date(incident.date)
    });
  });

  return feed;
};

export default async function feeds(siteConfig: ConfigFile, lang: string) {
  const database = await createDatabase(siteConfig);

  return {
    rss: () => {
      const rss = buildFeed(database, siteConfig, lang);
      return rss.rss2();
    },
    atom: () => {
      const atom = buildFeed(database, siteConfig, lang, true);
      return atom.atom1();
    }
  };
};
