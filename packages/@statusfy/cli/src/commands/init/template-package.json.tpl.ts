export default `{
  "name": "<%= options.name %>",
  "description": "<%= options.description %>",
  "private": true,
  "scripts": {
    "test": "echo 'Error: no test specified' && exit 1",
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
    "node": ">=10"
  }
}`
