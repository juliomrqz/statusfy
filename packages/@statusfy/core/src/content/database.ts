import { readdir, stat, readFile } from "fs"
import { promisify } from "util"
import spawn from "cross-spawn"
import drop from "lodash.drop"
import sortBy from "lodash.sortby"

import { ConfigFile } from "@statusfy/config/src/interfaces";
import { logger, path, fse, LRU, Dates } from "@statusfy/common/src";
import { Incident } from './incident'
import { IncidentFrontMatter, IncidentFrontMatterContent } from '../interfaces'

type GroupOfGroupOfIncidents = {
  [index: string]: IncidentFrontMatterContent[];
}

type GroupOfIncidents = {
  [index: string]: IncidentFrontMatterContent;
}

interface Period { id: string; incidents: IncidentFrontMatterContent[]; order: number; count: number; }

const dates = Dates();
const readdirP = promisify(readdir);
const statP = promisify(stat);
const readFileP = promisify(readFile);

const cache = new LRU({
  max: 1000,
  maxAge: process.env.NODE_ENV !== "development" ? 1000 * 60 * 60 : 1
});

const getGitLastUpdatedTimeStamp = (filepath: string): number => {
  const { stdout } = spawn.sync("git", ["log", "-1", "--format=%ct", filepath]);

  return parseInt(stdout.toString("utf-8")) * 1000;
};


const readFileIncidents = async (dirPath: string): Promise<IncidentFrontMatterContent[]> => {
  const allIncidents: IncidentFrontMatterContent[] = [];

  const exists = await fse.pathExists(dirPath);

  if (!exists) {
    logger.warn(`Content Directory not found: ${dirPath}`);
  } else {
    try {
      const files = (await readdirP(dirPath)).map(f => path.join(dirPath, f));

      for (let i = 0; i < files.length; i++) {
        const filePath = files[i];
        const isFile = (await statP(filePath)).isFile();

        if (
          isFile &&
          path.extname(filePath) === ".md" &&
          path.basename(filePath).toLowerCase() !== "readme.md"
        ) {
          const fileName = path.relative(dirPath, filePath);
          const fileContent = (await readFileP(filePath)).toString("utf8");
          const incident = new Incident(fileContent, fileName).getData();

          if (!incident.modified) {
            try {
              incident.modified = new Date(
                getGitLastUpdatedTimeStamp(filePath)
              ).toISOString();
            } catch (error) {
              incident.modified = null;
            }
          }

          allIncidents.push(incident);
        }
      }
    } catch (error) {
      logger.error(error);
    }
  }

  return allIncidents;
};

const getIncidents = async (siteConfig: ConfigFile) => {
  const incidents: GroupOfGroupOfIncidents = {};
  const scheduled: GroupOfGroupOfIncidents = {};

  // Retrieve incidents for each language
  for (let i = 0; i < siteConfig.locales.length; i++) {
    const locale = siteConfig.locales[i];
    const cacheKey = `incidents-${locale.code}`;
    let localeIncidents = cache.get(cacheKey) as IncidentFrontMatterContent[];

    if (!localeIncidents) {
      let contentPath = path.join(siteConfig.sourceDir, siteConfig.content.dir);

      if (locale.code !== siteConfig.defaultLocale) {
        contentPath = path.join(contentPath, locale.code);
      }

      localeIncidents = await readFileIncidents(contentPath);
    }

    // @ts-ignore
    incidents[locale.code] = localeIncidents.filter(i => {
      if (i.severity === "under-maintenance" && i.scheduled && i.duration) {
        return new Date(i.scheduled) < new Date();
      } else {
        return true;
      }
    });

    // @ts-ignore
    scheduled[locale.code] = localeIncidents.filter(i => {
      if (i.severity === "under-maintenance" && i.scheduled && i.duration) {
        return new Date(i.scheduled) >= new Date();
      } else {
        return false;
      }
    });

    cache.set(cacheKey, localeIncidents);
  }

  return {
    incidents,
    scheduled
  };
};

const getPaginatedItems = <T>(items: T[], page = 1, pageSize = 10) => {
  // Based on https://gist.github.com/jstott/7b50d4f4790c357227bafd13b4ef32a4
  pageSize = pageSize === -1 ? items.length : pageSize;
  const offset = (page - 1) * pageSize;
  const pagedItems = drop<T>(items, offset).slice(0, pageSize);

  return {
    page,
    pageSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pageSize),
    data: pagedItems
  };
};

export default async function database(siteConfig, finalDate) {
  const { incidents, scheduled } = await getIncidents(siteConfig);
  const sortIncidents = (incidents: GroupOfIncidents): IncidentFrontMatterContent[] => sortBy(incidents, o => -Number(new Date(o.date)));
  const sortScheduled = (scheduled: GroupOfIncidents): IncidentFrontMatterContent[] => sortBy(scheduled, o => -Number(new Date(o.scheduled)));

  return {
    incidents(lang: string, page = 1, pageSize = 10) {
      const sortedIncidents = sortIncidents(incidents[lang]);
      const paginatedIncidents = getPaginatedItems<IncidentFrontMatterContent>(
        sortedIncidents,
        page,
        pageSize
      );

      return {
        count: sortedIncidents.length,
        page: paginatedIncidents.page,
        page_size: paginatedIncidents.pageSize,
        total_pages: paginatedIncidents.totalPages || 1,
        incidents: paginatedIncidents.data
      };
    },
    incidentsHistory(lang: string, page = 1, pageSize = 3) {
      const sortedIncidents = sortIncidents(incidents[lang]);
      let periods: Period[] = [];

      if (sortedIncidents.length > 0) {
        const start = dates.parse(
          sortedIncidents[sortedIncidents.length - 1].date
        );
        const end = dates.parse(sortedIncidents[0].date);
        const range = dates.range(start, end, "month");
        periods = range.dates.reverse().map((period, i) => {
          return {
            id: `${period.year()}-${period.month() + 1}`,
            incidents: [],
            order: i + 1,
            count: 0
          };
        });

        // eslint-disable-next-line no-unused-vars
        for (const incident of sortedIncidents) {
          const incidentDate = dates.parse(incident.date);
          const month = incidentDate.month() + 1;
          const year = incidentDate.year();
          const monthObject = periods.find(d => d.id === `${year}-${month}`);

          monthObject.count += 1;
          monthObject.incidents.push(incident);
        }

        // Exclude periods with no incidents
        periods = periods.filter(e => e.count > 0);
      }

      const paginatedPeriods = getPaginatedItems<Period>(periods, page, pageSize);

      return {
        count: periods.length,
        page: paginatedPeriods.page,
        page_size: paginatedPeriods.pageSize,
        total_pages: paginatedPeriods.totalPages || 1,
        periods: paginatedPeriods.data
      };
    },
    incidentsTimeline(lang: string, daysNumber = 7) {
      const sortedIncidents = sortIncidents(incidents[lang]);
      // Beginning of today
      const end = dates.parse(finalDate);
      // {daysNumber} days ago from today
      const start = end.subtract(daysNumber, "day");
      const range = dates.range(start, end);
      const days = [];

      // Get incidents for each day in the range
      let order = 1;
      // eslint-disable-next-line no-unused-vars
      for (const day of range.dates.reverse()) {
        const incidents = [];

        // eslint-disable-next-line no-unused-vars
        for (const incident of sortedIncidents) {
          const incidentDate = dates.parse(incident.date);
          const difference = incidentDate.diff(day, "hour");

          // If difference is less that 24 hours, include incident
          // in the selected day
          if (difference > 0 && difference <= 24) {
            incidents.push(incident);
          } else if (Math.abs(difference) > (daysNumber + 1) * 24) {
            // Incidents are already ordered chronologically,
            // so if difference is more than daysNumber + 1,
            // it's not worthy to keep looking for other incidents
            break;
          }
        }

        days.push({
          date: day,
          count: incidents.length,
          incidents,
          order
        });

        order++;
      }

      /* eslint-disable prettier/prettier */
      const daysSinceLatest =
        sortedIncidents && sortedIncidents.length < 1
          ? 0
          : sortedIncidents[0] && sortedIncidents[0].date
            ? Math.abs(end.diff(dates.parse(sortedIncidents[0].date), "day"))
            : 0;
      /* eslint-enable */

      return {
        count: days.length,
        days,
        daysSinceLatest
      };
    },
    incident(id: string, lang: string): IncidentFrontMatterContent {
      return incidents[lang].filter(i => i.id === id)[0];
    },
    systems(lang: string) {
      const systems: { name: string, status: string, order: number }[] = [];
      // Important order of relevance
      const systemSeverities = [
        "under-maintenance",
        "major-outage",
        "partial-outage",
        "degraded-performance"
      ];
      let order = 1;

      siteConfig.content.systems.forEach(system => {
        const currentSystem = { name: system, status: "operational", order };

        // eslint-disable-next-line no-unused-vars
        for (const severity of systemSeverities) {
          const unresolved = incidents[lang].filter(
            incident =>
              incident.affectedsystems.includes(system) &&
              incident.severity === severity &&
              incident.resolved === false
          ).length;

          if (unresolved > 0) {
            currentSystem.status = severity;
            break;
          }
        }

        systems.push(currentSystem);
        order++;
      });

      return systems;
    },
    scheduled(lang: string) {
      const sortedScheduled = sortScheduled(scheduled[lang]);
      const paginatedScheduled = getPaginatedItems(sortedScheduled, 1, -1);

      return {
        count: sortedScheduled.length,
        incidents: paginatedScheduled.data
      };
    }
  };
};
