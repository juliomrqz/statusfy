---
title: Incidents
description: "Incidents are the core of Statusfy: there is no Status Page System without a record of incidents. The Incidents information is stored in a Markdown file with attributes and a body that provides extra information to your users."
date: 2018-10-12T17:28:04Z
sidebarDepth: 3
permalink: /guide/incidents
---

# Incidents

Incidents are the core of Statusfy: there is no Status Page System without a record of incidents.

The Incidents information is stored in a Markdown file with attributes and a body that provides extra information to your users.

You must create the incidents in the `./content` folder (this pathname can be changed, more information [here](../config/README.md#dir)) to be discovered by Statusfy. It's generated an HTML page for Each of your Incidents, and they are listed in the History Section of your Status Page System.

::: warning REMEMBER
You must create a sub-folder for each of your [Secondary Languages](../guide/i18n.md#configuration) and place the source of your incidents' translation.
:::

You can create your incidents by hand for each of your available languages or you can use  CLI:

```bash
npm run new-incident
```

::: tip TIP
After you answer a few questions with this command, an initial Markdown file is automatically generated for your Incident for all the available languages. More information in the [Commands Guide](../guide/commands.md#new-incident).
:::

## Naming Convention

You can name the file of your Incidents the way you desire the most but we recommend this pattern: `YYYY-MM-DD_slug.md`, where `YYYY-MM-DD` is the ***creation date*** and `slug` a ***short name***. For example:

```
/content/2018-11-21_networking-issues.md
/content/2018-11-22_origin-server-errors.md
/content/2018-11-22_origin-server-errors_2.md
```

This way, you can quickly sort by the creation date of your incidents and guarantee a unique filename.


::: tip TIP
The `new-incident` command uses this pattern by default.
:::

## Front Matter

Front Matter is the way you can define extra properties to your incidents. It must be the first thing in the file and must be defined between triple-dashed lines. [YAML front matter](https://jekyllrb.com/docs/front-matter/) is supported out of the box:

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

A unique identifier for the Incident. It must be alphanumeric to prevent errors when generating/building/accessing the system.

If this value is not explicitly defined, it will be automatically generated a unique string based on the filename of the Incident.

#### title

- Type: `string`
- Requirement: `mandatory`

The title of the Incident.

#### description

- Type: `string`
- Requirement: `optional but recommended`

A short description of the Incident. It's used as a meta description and as a summary for the Incident in the History section.

#### date

- Type: `string`
- Requirement: `mandatory`

The creation date of the Incident in [ISO-8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString): `YYYY-MM-DDTHH:mm:ss.sssZ`.

#### modified

- Type: `string`
- Requirement: `optional`

The last modification of the Incident. If a value is defined, you must update it every time the Incident is updated. 


::: tip TIP
Suppose you use `git` in your project. In that case, this value can be automatically generated from the date of the file's last git commit. 
:::

#### severity

- Type: `string`
- Requirement: `mandatory`

The severity of the Incident. There are four available values:

- *under-maintenance*: The system(s) cannot handle requests due to a temporary maintenance update.
- *major-outage*: No one can access the system(s) because it is completely down.
- *partial-outage*: Limited access to the system(s) because it's probably experiencing difficulties.
- *degraded-performance*: The system(s) is not stable; it's working slow, otherwise impacted in a minor way. 

#### affectedsystems

- Type: `string`
- Requirement: `mandatory`

The affected system(s) the Incident is referring to. The values that can be used must be defined in the configuration file (More information in the [Config Reference](../config/README.md#systems)).

#### resolved

- Type: `boolean`
- Requirement: `mandatory`
- Default: `false`

If this field is set to true, the Incident is Marked as Resolved.

#### scheduled <Badge text="0.2.0+"/>

- Type: `string`
- Requirement: `optional`
- Default: `undefined`

The scheduled start time. This defines the initial of the planned maintenance window in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601) e.g. `2021-09-02T15:22:37+00:00`.

#### duration <Badge text="0.2.0+"/>

- Type: `string`
- Requirement: `optional`
- Default: `undefined`

The scheduled duration in **minutes**. This defines the duration of the planned maintenance window.


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

And TOML front matter also needs to be explicitly marked, as TOML:

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

## Scheduled Maintenance <Badge text="0.2.0+"/>

Scheduled Maintenances definition is a way to let your users know, ahead of time, when your system(s) cannot handle requests due to a temporary maintenance update.

Scheduled Maintenances share the same parameters as regular incidents but two parameters are always required: [`scheduled`](#scheduled) and [`duration`](#duration).

It would help if you kept in mind that these definitions are handled in a different way than regular Incidents:

- These Special Incidents are displayed in the **Scheduled Maintenance** section (at the Home Page) while the [`scheduled`](#scheduled) date has not arrived.
- After the [`scheduled`](#scheduled) date passes, you must set the [`resolved`](#resolved) parameter to `true` if the maintenance window has finished.
- Scheduled Maintenances are not displayed in the **Incidents Timeline** and the **Incidents History** while the [`scheduled`](#scheduled) date has not arrived.

::: warning IMPORTANT
Remember to set the `severity` field to `under-maintenance` (more info [here](#severity)) to consider your Scheduled Maintenance definition.
:::

## Content

The Incidents' content is written in a valid Markdown format, but there are extra Extensions that Statusfy provides.

### Updates Containers

These containers are the way the Updates of Incidents are defined. 

```markdown
::: update Resolved | 2018-02-06T01:24:45.752Z
We detected a networking problem that caused temporary issues for our API and origin servers. All systems are back to normal now, but we're monitoring closely.
:::
```

You must provide a Title, a Date in [ISO-8601 format][iso-format] (`YYYY-MM-DDTHH:mm:ss.sssZ`), and a valid Markdown content.

### Links

#### Internal Links

Any absolute or relative link is treated as an internal link.

#### External Links

A link with a defined domain is identified as an outbound link and automatically gets `target="_blank" rel="noopener noreferrer" class="external"`:

### Emojis :nerd_face:

Emojis can also be used.

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
description: Our Files Conversion Process was responding slowly.
date: 2018-01-28T18:28:48.878Z
modified: 2018-01-28T20:28:48.878Z
severity: degraded-performance
affectedsystems:
  - api
  - cdn
resolved: true
---

<!-- Your General content -->
Our Files Conversion Process was responding slowly.

<!-- Definition of the Incident Updates -->
::: update Resolved | 2018-01-28T22:28:48.878Z
Performance is back to normal and we'll continue to monitor.
:::

::: update Monitoring | 2018-01-28T23:28:48.878Z
The Conversion Process is back to normal, and we'll continue to monitor.
:::

::: update Resolved | 2018-01-28T23:58:48.878Z
The Files Conversion System is back to normal, and we'll continue to monitor.
:::
```

This file will be rendered as an HTML page similar to this one: [Demo Incident - #382ee1ab](https://statusfy.marquez.co/incidents/382ee1ab)



[iso-format]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
