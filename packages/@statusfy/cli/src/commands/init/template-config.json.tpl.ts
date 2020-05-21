export default `{
  "title": "<%= options.title %>",
  "name": "<%= options.name %>",
  "description": "<%= options.description %>",
  "defaultLocale": "<%= options.language.code %>",
  "locales": [
    {
      "code": "<%= options.language.code %>",
      "iso": "<%= options.language.iso %>",
      "name": "<%= options.language.name %>"
    }
  ]<% if (options.frontMatterFormat) { %>,
    "content": {
    "frontMatterFormat": "<%= options.frontMatterFormat %>"
  }<% } %>
}`
