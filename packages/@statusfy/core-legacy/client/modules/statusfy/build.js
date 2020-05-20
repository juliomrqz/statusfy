const createDatabase = require("../../../lib/content/database");

const asset = object => {
  // webpack asset
  const content = JSON.stringify(
    object,
    null,
    process.env.NODE_ENV === "production" ? 0 : 2
  );
  return {
    source: () => content,
    size: () => content.length
  };
};

module.exports = async function buildContent(nuxt, isStatic) {
  if (isStatic) {
    const database = await createDatabase(nuxt.options.statusfy.siteConfig);
    const pathPrefix = "/content/api/v0";

    nuxt.options.build.plugins.push({
      apply(compiler) {
        compiler.plugin("emit", (compilation, cb) => {
          nuxt.options.statusfy.locales.forEach(locale => {
            // Systems
            let key = `${pathPrefix}/systems.${locale.code}.json`;
            compilation.assets[key] = asset(database.systems(locale.code));

            // Timeline
            key = `${pathPrefix}/incidents/timeline.${locale.code}.json`;
            compilation.assets[key] = asset(
              database.incidentsTimeline(locale.code)
            );

            // All Incients Pages
            const incidentsPage1 = database.incidents(locale.code);
            let currentPage = 1;
            let totalPages = incidentsPage1.total_pages;

            while (currentPage <= totalPages) {
              const data = database.incidents(locale.code, currentPage);
              key = `${pathPrefix}/incidents.page-${currentPage}.${locale.code}.json`;

              compilation.assets[key] = asset(data);

              currentPage = data.page + 1;
            }

            // History Pages
            const historyPage1 = database.incidentsHistory(locale.code);
            currentPage = 1;
            totalPages = historyPage1.total_pages;

            while (currentPage <= totalPages) {
              const data = database.incidentsHistory(locale.code, currentPage);

              key = `${pathPrefix}/incidents/history.page-${currentPage}.${locale.code}.json`;
              compilation.assets[key] = asset(data);

              currentPage = data.page + 1;
            }

            // Incident Detail Pages
            const incidents = database.incidents(locale.code, 1, -1).incidents;

            incidents.forEach(incident => {
              key = `${pathPrefix}/incidents/${incident.id}.${locale.code}.json`;
              compilation.assets[key] = asset(incident);
            });

            // Scheduled
            key = `${pathPrefix}/scheduled.${locale.code}.json`;
            compilation.assets[key] = asset(database.scheduled(locale.code));
          });

          cb();
        });
      }
    });

    // Add Dynamic Pages
    nuxt.options.generate.routes = [];

    nuxt.options.statusfy.locales.forEach(locale => {
      const prefix =
        locale.code === nuxt.options.statusfy.siteConfig.defaultLocale
          ? ""
          : `/${locale.code}`;

      // History Pages
      const totalPages = database.incidentsHistory(locale.code).total_pages;

      for (let i = 2; i <= totalPages; i++) {
        nuxt.options.generate.routes.push(`${prefix}/history/${i}`);
      }

      // Incident Detail Pages
      const incidents = database.incidents(locale.code, 1, -1).incidents;

      incidents.forEach(incident => {
        nuxt.options.generate.routes.push(`${prefix}/incidents/${incident.id}`);
      });
    });
  }
};
