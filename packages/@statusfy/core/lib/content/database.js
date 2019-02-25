const { readdir, stat, readFile } = require("fs");
const { promisify } = require("util");
const LRU = require("lru-cache");
const spawn = require("cross-spawn");
const drop = require("lodash.drop");
const sortBy = require("lodash.sortby");
const Moment = require("moment");
const MomentRange = require("moment-range");

const createMarkdown = require("@statusfy/markdown");
const { logger, hash, path, fse } = require("@statusfy/common");

const moment = MomentRange.extendMoment(Moment);
const readdirP = promisify(readdir);
const statP = promisify(stat);
const readFileP = promisify(readFile);

const md = createMarkdown();
const cache = new LRU({
  max: 1000,
  maxAge: process.env.NODE_ENV !== "development" ? 1000 * 60 * 60 : 1
});

const getGitLastUpdatedTimeStamp = filepath => {
  const { stdout } = spawn.sync("git", ["log", "-1", "--format=%ct", filepath]);

  return parseInt(stdout.toString("utf-8")) * 1000;
};

class Incident {
  constructor(fileContent, fileName) {
    // Save content
    this.content = md.render(fileContent);

    // Save properties
    const matter = md.frontmatter;
    this.title = matter.title;
    this.description = matter.description;
    this.date = matter.date;
    this.modified = matter.modified;
    this.scheduled = matter.scheduled;
    this.duration = matter.duration ? Math.ceil(matter.duration) : undefined;
    this.severity = matter.severity;
    this.affectedsystems = matter.affectedsystems;
    this.resolved = matter.resolved;
    this.id = matter.id;

    if (!this.id) {
      this.id = hash(fileName);
    }
  }

  getData() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
      modified: this.modified,
      scheduled: this.scheduled,
      duration: this.duration,
      severity: this.severity,
      affectedsystems: this.affectedsystems,
      resolved: this.resolved,
      content: this.content
    };
  }
}

const readFileIncidents = async dirPath => {
  const allIncidents = [];

  const exists = await fse.pathExists(dirPath);

  if (!exists) {
    logger.warn("Content Directory not found:", dirPath);
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

const getIncidents = async siteConfig => {
  const incidents = {};
  const scheduled = {};

  // Retrieve incidents for each language
  for (let i = 0; i < siteConfig.locales.length; i++) {
    const locale = siteConfig.locales[i];
    const cacheKey = `incidents-${locale.code}`;
    let localeIncidents = cache.get(cacheKey);

    if (!localeIncidents) {
      let contentPath = path.join(siteConfig.sourceDir, siteConfig.content.dir);

      if (locale.code !== siteConfig.defaultLocale) {
        contentPath = path.join(contentPath, locale.code);
      }

      localeIncidents = await readFileIncidents(contentPath);
    }

    incidents[locale.code] = localeIncidents.filter(i => {
      if (i.severity === "under-maintenance" && i.scheduled && i.duration) {
        return new Date(i.scheduled) < new Date();
      } else {
        return true;
      }
    });
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

const getPaginatedItems = (items, page = 1, pageSize = 10) => {
  // Based on https://gist.github.com/jstott/7b50d4f4790c357227bafd13b4ef32a4
  pageSize = pageSize === -1 ? items.length : pageSize;
  const offset = (page - 1) * pageSize;
  const pagedItems = drop(items, offset).slice(0, pageSize);

  return {
    page,
    pageSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pageSize),
    data: pagedItems
  };
};

module.exports = async function database(siteConfig, finalDate) {
  const { incidents, scheduled } = await getIncidents(siteConfig);
  const sortIncidents = incidents =>
    sortBy(incidents, o => -Number(new Date(o.date)));
  const sortScheduled = scheduled =>
    sortBy(scheduled, o => -Number(new Date(o.scheduled)));

  return {
    incidents(lang, page = 1, pageSize = 10) {
      const sortedIncidents = sortIncidents(incidents[lang]);
      const paginatedIncidents = getPaginatedItems(
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
    incidentsHistory(lang, page = 1, pageSize = 3) {
      const sortedIncidents = sortIncidents(incidents[lang]);
      let periods = [];

      if (sortedIncidents.length > 0) {
        const start = moment(
          sortedIncidents[sortedIncidents.length - 1].date
        ).startOf("month");
        const end = moment(sortedIncidents[0].date).startOf("month");
        const range = moment.range(start, end);
        const rangeMonths = Array.from(
          range.by("month", { excludeStart: true })
        ).reverse();
        periods = rangeMonths.map((period, i) => {
          return {
            id: `${period.year()}-${period.month() + 1}`,
            incidents: [],
            order: i + 1,
            count: 0
          };
        });

        for (const incident of sortedIncidents) {
          const incidentDate = moment(incident.date);
          const month = incidentDate.month() + 1;
          const year = incidentDate.year();
          const monthObject = periods.find(d => d.id === `${year}-${month}`);

          monthObject.count += 1;
          monthObject.incidents.push(incident);
        }

        // Exclude periods with no incidents
        periods = periods.filter(e => e.count > 0);
      }

      const paginatedPeriods = getPaginatedItems(periods, page, pageSize);

      return {
        count: periods.length,
        page: paginatedPeriods.page,
        page_size: paginatedPeriods.pageSize,
        total_pages: paginatedPeriods.totalPages || 1,
        periods: paginatedPeriods.data
      };
    },
    incidentsTimeline(lang, daysNumber = 7) {
      const sortedIncidents = sortIncidents(incidents[lang]);
      // Beginning of today
      const end = (finalDate ? moment(finalDate) : moment()).startOf("day");
      // {daysNumber} days ago from today
      const start = moment(end).subtract(daysNumber, "days");
      const range = moment.range(start, end);
      const rangeDays = Array.from(
        range.by("day", { excludeStart: true })
      ).reverse();
      const days = [];

      // Get incidents for each day in the range
      let order = 1;
      for (const day of rangeDays) {
        const incidents = [];

        for (const incident of sortedIncidents) {
          const incidentDate = moment(incident.date);
          const difference = incidentDate.diff(day, "hours");

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

      const daysSinceLatest =
        sortedIncidents && sortedIncidents.length < 1
          ? 0
          : sortedIncidents[0] && sortedIncidents[0].date
            ? Math.abs(end.diff(moment(sortedIncidents[0].date), "days"))
            : 0;

      return {
        count: days.length,
        days,
        daysSinceLatest
      };
    },
    incident(id, lang) {
      return incidents[lang].filter(i => i.id === id)[0];
    },
    systems(lang) {
      const systems = [];
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
    scheduled(lang) {
      const sortedScheduled = sortScheduled(scheduled[lang]);
      const paginatedScheduled = getPaginatedItems(sortedScheduled, 1, -1);

      return {
        count: sortedScheduled.length,
        incidents: paginatedScheduled.data
      };
    }
  };
};
