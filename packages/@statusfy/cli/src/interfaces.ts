export interface Incident {
  name: string;
  value: {
    name: string;
    path: string;
  },
}

export interface ParsedIncident {
  content: string;
  data: { [key: string]: string | boolean };
}
