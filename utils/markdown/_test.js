const createMarkdown = require('./index')

const md = createMarkdown()

const text = `---
title: Conversions Issues
date: 2018-04-24T06:39:09.000Z
severity: "degraded-performance"
affectedsystems: [
  "Conversions"
]
resolved: true
---

# Heading

:tada: :100:

::: update Investigating | 2018-04-24T06:39:09.000Z
Our **Files Conversion** Process is responding slowly and we've investigating what is causing this issue.
:::

::: update Resolved | 2018-04-24T07:24:09.000Z
The Conversion Process is back to normal and we'll continue to monitor.

:tada: :100:
:::

::: update Resolved | 2018-04-24T07
The Conversion Process is back to normal and we'll continue to monitor.
:::
`

console.log('------ START ------')

console.log('content:', md.render(text))
console.log('frontmatter:', md.frontmatter)

console.log('------ END ------')
