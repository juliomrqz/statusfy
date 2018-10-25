---
sidebarDepth: 3
---

# Incidents

Incidents are the core of Statusfy: there is no Status Page System with a record of incidents.

The Incidents information is stored in a Markdown file with attributes and a content that provides extra information to your users.

You must create the incidents in the `./content` folder (this pathname can be changed, more information [here](../config/README.md#dir)) in order to be discovered by Statusfy. It's generated an HTML page for Each of your Incidents, and they are listed in the History Section of your Status Page System.

::: warning REMEMBER
You must create a sub-folder for each of your [Secondary Languages](../guide/i18n.md#configuration) and place the source of the translation of your incidents.
:::

You can create your incidents by hand for each of your available languages or you can use  CLI:

```bash
npm run new-incident
```

::: tip TIP
With this command, after you answer a few questions, an initial Markdown file is automatically generated for your incident for all the available languages. More information in the [Commands Guide](../guide/commands.md#new-incident).
:::

## Naming Convention

You can name the file of your Incidents in the way you desired the mosth but recomend this pattern `YYYY-MM-DD_slug.md`, where `YYYY-MM-DD` is the ***creation date*** and `slug` a ***short name***. For example:

```
/content/2018-11-21_networking-issues.md
/content/2018-11-22_origin-server-errors.md
/content/2018-11-22_origin-server-errors_2.md
```

This way you can easily sort by date your incidents and guarantee a unique file name.


::: tip TIP
The `new-incident` command use this pattern by default.
:::

## Front Matter

Front Matter is the way you can define extra properties to your incidents. Must be the first thing in the file and must be defined between triple-dashed lines. [YAML front matter](https://jekyllrb.com/docs/front-matter/) is supported out of the box:

```yaml
---
id: 382ee1ab
title: "Networking Issues"
description: "We detected a networking problem that caused temporary issues for our API and origin servers."
date: 2018-10-16T13:14:03.000Z
modified: 2018-10-16T13:14:03.000Z
severity: "degraded-performance"
affectedsystems:
  - "site-delivery"
  - "api"
resolved: true
---
```

### Supported Parameters

#### id

- Type: `string`
- Requirement: `optional`

#### title

- Type: `string`
- Requirement: `mandatory`

#### description

- Type: `string`
- Requirement: `optional but recomended`

#### date

- Type: `string`
- Requirement: `mandatory`

#### modified

- Type: `string`
- Requirement: `optional`

Predefined value
Git

#### severity

- Type: `string`
- Requirement: `mandatory`

Available values:

- *under-maintenance*:
- *major-outage*:
- *partial-outage*:
- *degraded-performance*:


#### affectedsystems

- Type: `string`
- Requirement: `mandatory`

#### resolved

- Type: `boolean`
- Requirement: `mandatory`

### Alternative Front Matter Formats

In addition, you can define your front matter as a [JSON](https://en.wikipedia.org/wiki/JSON) or [TOML](https://github.com/toml-lang/toml).

JSON front matter needs to start and end in curly braces and needs to be explicitly marked as JSON:

```markdown
---json
{
  "id": "382ee1ab",
  "title": "Networking Issues",
  "description": "We detected a networking problem that caused temporary issues for our API and origin servers.",
  "date": "2018-10-16T13:14:03.000Z",
  "modified": "2018-10-16T13:14:03.000Z",
  "severity": "degraded-performance",
  "affectedsystems": [
    "site-delivery",
    "api"
  ],
  "resolved": true
}
---
```

And TOML front matter also needs to be explicitly marked as TOML:

```markdown
---toml
id = "382ee1ab"
title = "Networking Issues"
description = "We detected a networking problem that caused temporary issues for our API and origin servers."
date = 2018-10-16T13:14:03.000Z
modified = 2018-10-16T13:14:03.000Z
severity = "degraded-performance"
affectedsystems = [
  "site-delivery",
  "api"
]
resolved = true
---
```

::: warning IMPORTANT
Statusfy only supports the [version 0.4.0](https://github.com/toml-lang/toml/blob/master/versions/en/toml-v0.4.0.md) of the TOML specification.
:::

## Content



### Updates Containers


### Links

#### Internal Links

#### External Links

Outbound links automatically gets `target="_blank" rel="noopener noreferrer" class="external"`:


### Emojis :nerd_face:

**Input**

```
:nerd_face: :tada: :100:
```

**Output**

:nerd_face: :tada: :100:

A list of all emojis available can be found [here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).


## Example File

```markdown
---
id: 382ee1ab
title: API Issues
description: Our Files Conversion Process were responding slowly.
date: 2018-01-28T18:28:48.878Z
modified: 2018-01-28T20:28:48.878Z
severity: degraded-performance
affectedsystems:
  - api
  - cdn
resolved: true
---

<!-- Your General content -->
Our Files Conversion Process were responding slowly.

<!-- Definition of the Incident Updates -->
::: update Resolved | 2018-01-28T22:28:48.878Z
Performance is back to normal and we'll continue to monitor.
:::

::: update Monitoring | 2018-01-28T23:28:48.878Z
The Conversion Process is back to normal and we'll continue to monitor.
:::

::: update Resolved | 2018-01-28T23:58:48.878Z
The Files Conversion System is back to normal and we'll continue to monitor.
:::
```

This file will be redered as a HTML page silimiar to this one: [Demo Incident - #382ee1ab](https://demo.statusfy.co/incidents/382ee1ab)
