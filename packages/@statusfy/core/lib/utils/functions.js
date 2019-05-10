const { fse, grayMatter, chalk, path } = require("@statusfy/common");

const getIncidentsFromProject = async contentDir => {
  const files = await fse.readdir(contentDir);
  const incidentsList = [];

  for (let i = 0; i < files.length; i++) {
    const f = path.resolve(contentDir, files[i]);
    const ext = path.extname(f);
    const fileName = path.basename(f);

    if (ext === ".md") {
      const fileContent = await fse.readFile(f);
      const { data } = grayMatter.parse(fileContent);

      incidentsList.push({
        value: {
          name: fileName,
          path: f
        },
        name: `${fileName} > ${chalk.yellow(data.title)} (${chalk.green(
          new Date(data.date).toUTCString()
        )})`
      });
    }
  }

  return incidentsList;
};

const generateIncident = (data, content, format) => {
  let matterContent = grayMatter.stringify(content, data, format);

  if (["json", "toml"].includes(format)) {
    matterContent = matterContent.replace(/^---/, `---${format}`);
  }

  return matterContent;
};

module.exports = {
  getIncidentsFromProject,
  generateIncident
};
