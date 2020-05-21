export interface Incident {
  name: string;
  value: {
    file_name: string;
    path: string;
  },
}

export interface ParsedIncident {
  content: string;
  data: { [key: string]: string | boolean };
}
