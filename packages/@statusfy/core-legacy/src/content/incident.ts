import { hash, Dates } from "@statusfy/common/src";
const createMarkdown = require("@statusfy/markdown");

import { IncidentFrontMatterContent } from '../interfaces'

const md = createMarkdown();
const dates = Dates();

export class Incident {
  id: string;
  content: string;
  title: string;
  description: string;
  date: string;
  modified?: string;
  scheduled: string;
  duration?: string;
  severity: string;
  affectedsystems: string[];
  resolved: boolean;

  constructor(fileContent, fileName) {
    // Save content
    this.content = md.render(fileContent);

    // Save properties
    const matter = md.frontmatter;
    this.title = matter.title;
    this.description = matter.description;
    this.date = dates.parse(matter.date).toISOString();
    this.modified = dates.parse(matter.modified).toISOString();
    this.scheduled = matter.scheduled
      ? dates.parse(matter.scheduled).toISOString()
      : null;
    this.duration = matter.duration ? `${Math.ceil(matter.duration)}` : undefined;
    this.severity = matter.severity;
    this.affectedsystems = matter.affectedsystems;
    this.resolved = matter.resolved;
    this.id = matter.id;

    if (!this.id) {
      this.id = hash(fileName);
    }
  }

  getData(): IncidentFrontMatterContent {
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
