import { fse, grayMatter, chalk, path } from "@statusfy/common/src";
import { Incident } from './interfaces'

export const getIncidentsFromProject = async (contentDir: string): Promise<Incident[]> => {
  const files = await fse.readdir(contentDir);
  const incidentsList: Incident[] = [];

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
        name: `${fileName} > ${chalk.yellow(data.title)} (${chalk.green(new Date(data.date).toUTCString())})`
      });
    }
  }

  return incidentsList;
};

export const generateIncident = (data: Object, content: string, format: string): string => {
  let matterContent = grayMatter.stringify(content, data, format);

  if (["json", "toml"].includes(format)) {
    matterContent = matterContent.replace(/^---/, `---${format}`);
  }

  return matterContent;
};
