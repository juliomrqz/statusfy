import url from "url"
import ics from "ics"
import { Dates } from "@statusfy/common/src";
import Dayjs from 'dayjs'

import { ConfigFile } from "@statusfy/config/src/interfaces";
import createDatabase from "./database"

const dates = Dates();

const extractDate = (value: Dayjs.Dayjs) => {
  return [
    value.year(),
    value.month() + 1,
    value.date(),
    value.hour(),
    value.minute(),
    value.second()
  ];
};

export default async function calendar(siteConfig: ConfigFile, lang: string) {
  const database = await createDatabase(siteConfig);
  /* eslint-disable node/no-deprecated-api */
  const { host } = url.parse(siteConfig.baseUrl);
  /* eslint-enable */
  const events = [];
  const productId = `-//Statusfy//${host ||
    siteConfig.name}//calendar//scheduled//${lang.toUpperCase()}`;

  // Future events
  const incidents = database.scheduled(lang).incidents;

  // Past Events
  database.incidents(lang, 1, -1).incidents.forEach(i => {
    if (i.severity === "under-maintenance" && i.scheduled && i.duration) {
      incidents.push(i);
    }
  });

  incidents.forEach(i => {
    const id = host ? { uid: `${i.id}@${host}` } : {};

    events.push({
      title: i.title,
      description: i.description,
      start: extractDate(dates.parse(i.scheduled)),
      end: extractDate(dates.parse(i.scheduled).add(i.duration, "minute")),
      productId,
      ...id
    });
  });

  const calendar = ics.createEvents(events);
  const { error } = calendar;
  let { value } = calendar;

  if (error) {
    throw new Error(error);
  } else {
    if (!value) {
      value = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:${productId}\nEND:VCALENDAR`;
    }

    value = value.replace(
      `PRODID:${productId}`,
      `PRODID:${productId}\nNAME:${siteConfig.title}\nX-WR-CALNAME:${siteConfig.title}\nTIMEZONE-ID:UTC\nX-WR-TIMEZONE:UTC`
    );

    return value;
  }
};
