export interface IncidentFrontMatter {
  id?: string;
  title: string;
  description: string;
  date: string;
  modified?: string;
  severity: 'under-maintenance' | 'major-outage' | 'partial-outage' | 'degraded-performance';
  affectedsystems: string[];
  resolved: boolean;
  scheduled?: string;
  duration?: string;
}

export interface IncidentFrontMatterContent extends IncidentFrontMatter {
  context: string;
};
