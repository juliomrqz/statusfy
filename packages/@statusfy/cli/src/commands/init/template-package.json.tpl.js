export default `{
  "name": "<%= options.name %>",
  "description": "<%= options.description %>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "statusfy dev",
    "build": "statusfy build",
    "start": "statusfy start",
    "generate": "statusfy generate",
    "new-incident": "statusfy new-incident",
    "delete-incident": "statusfy delete-incident",
    "update-incident": "statusfy update-incident"
  },
  "dependencies": {
    "statusfy": "^<%= options.statusfyVersion %>"
  },
  "engines": {
    "node": ">=10",
    "npm": ">=5"
  }
}`
