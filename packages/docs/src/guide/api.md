---
sidebarDepth: 3
---

# API

Statusfy is a SPA [(Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application) that reads its data from an internal RESTful API. You can also retrieve this data from an existing application or library you may be using.

::: warning IMPORTANT
The URLs of the endpoints are different in both deployment modes: **Static Generated** or **Server Rendered**.
:::

## Common Parameters

Each of the endpoints below has common parameters that can be used:

### :page

Indicates the page number. You can define it in two ways:

- **Static Generated:** in the path of the URL of the endpoints.
- **Server Rendered:** as a query string.

### :lang

Indicates the language of the required response. You can define it in two ways:

- **Static Generated:** in the path of the URL of the endpoints.
- **Server Rendered:** in the `Accept-Language` request HTTP header.

## Base Path

The base path of the endpoints is different in each deployment mode:

|    Static Generated    | Server Rendered |
|:----------------------:|:---------------:|
| /static/content/api/v0 |     /api/v0/    |

## Endpoints

### /incidents <Badge text="get" />

Get all incidents.

|     |           Static Generated           |       Server Rendered        |
|:---:|:------------------------------------:|:----------------------------:|
| URL | /incidents.page-`:page`.`:lang`.json |    /incidents?page=`:page`   |

**Example response:**

```json
{
  "count": 50,
  "page": 1,
  "page_size": 10,
  "total_pages": 5,
  "incidents": [
    {
      "id": "1a96284b",
      "title": "Conversions Issues",
      "description": "Our Files Conversion System were not responding properly.",
      "date": "2018-11-09T16:23:42.505Z",
      "modified": "2018-11-09T18:23:42.505Z",
      "severity": "degraded-performance",
      "affectedsystems": [
        "api",
        "cdn"
      ],
      "resolved": false,
      "content": "<p>Our Files Conversion System were not responding properly.</p>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T20:23:42.505Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion Process is responding slowly and we've investigating what is causing this issue.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T21:23:42.505Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Monitoring</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue. If you're affected by this issue, you can contact us at our <a href=\"https://demo.statusfy.co\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"external\">Support Page</a>.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T21:53:42.505Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue.</p>\n</div></div></div>\n"
    },
    {
      "id": "1a96284c",
      "title": "Files Conversion Issues",
      "description": "Our origin servers were responding slowly.",
      "date": "2018-11-09T16:23:42.505Z",
      "modified": "2018-11-09T18:23:42.505Z",
      "severity": "partial-outage",
      "affectedsystems": [
        "api",
        "cdn",
        "conversions"
      ],
      "resolved": true,
      "content": "<p>Our origin servers were responding slowly.</p>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T20:23:42.505Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue. If you're affected by this issue, you can contact us at our <a href=\"https://demo.statusfy.co\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"external\">Support Page</a>.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T21:23:42.505Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Monitoring</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T21:53:42.505Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our origin servers are responding slowly and we've added more capacity and are continuing to investigate.</p>\n</div></div></div>\n"
    },
    ...
  ]
}
```

### /incidents/:id <Badge text="get" />

Get an Incident.

|     |        Static Generated       |  Server Rendered  |
|:---:|:-----------------------------:|:-----------------:|
| URL | /incidents/`:id`.`:lang`.json |  /incidents/`:id` |

Extra Parameter:

- **id:** Incident ID

**Example response:**

```json
{
  "id": "382ee149",
  "title": "API Issues",
  "description": "Our Files Conversion Process were responding slowly.",
  "date": "2018-09-03T15:48:45.061Z",
  "modified": "2018-09-03T17:48:45.061Z",
  "severity": "partial-outage",
  "affectedsystems": [
    "api",
    "cdn",
    "conversions"
  ],
  "resolved": true,
  "content": "<p>Our Files Conversion Process were responding slowly.</p>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-09-03T19:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-09-03T20:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Monitoring</div>\n            <div class=\"update-block-body\">\n<p>Our origin servers are responding slowly and we've added more capacity and are continuing to investigate.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-09-03T21:18:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Performance is back to normal and we'll continue to monitor.</p>\n</div></div></div>\n"
}
```

### /incidents/history <Badge text="get" />

Get all incidents grouped by months.

|     |               Static Generated               |         Server Rendered         |
|:---:|:--------------------------------------------:|:-------------------------------:|
| URL | /incidents/history.page-`:page`.`:lang`.json | /incidents/history?page=`:page` |

**Example response:**

```json
{
  "count": 10,
  "page": 1,
  "page_size": 3,
  "total_pages": 4,
  "periods": [
    {
      "id": "2018-11",
      "incidents": [
        {
          "id": "1a96284b",
          "title": "Conversions Issues",
          "description": "Our Files Conversion System were not responding properly.",
          "date": "2018-11-09T15:48:45.061Z",
          "modified": "2018-11-09T17:48:45.061Z",
          "severity": "degraded-performance",
          "affectedsystems": [
            "api",
            "cdn"
          ],
          "resolved": false,
          "content": "<p>Our Files Conversion System were not responding properly.</p>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T19:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion Process is responding slowly and we've investigating what is causing this issue.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T20:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Monitoring</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue. If you're affected by this issue, you can contact us at our <a href=\"https://demo.statusfy.co\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"external\">Support Page</a>.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T21:18:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue.</p>\n</div></div></div>\n"
        },
        {
          "id": "1a96284c",
          "title": "Files Conversion Issues",
          "description": "Our origin servers were responding slowly.",
          "date": "2018-11-09T15:48:45.061Z",
          "modified": "2018-11-09T17:48:45.061Z",
          "severity": "partial-outage",
          "affectedsystems": [
            "api",
            "cdn",
            "conversions"
          ],
          "resolved": true,
          "content": "<p>Our origin servers were responding slowly.</p>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T19:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue. If you're affected by this issue, you can contact us at our <a href=\"https://demo.statusfy.co\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"external\">Support Page</a>.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T20:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Monitoring</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T21:18:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our origin servers are responding slowly and we've added more capacity and are continuing to investigate.</p>\n</div></div></div>\n"
        },
        ...
      ],
      "order": 1,
      "count": 5
    },
    {
      "id": "2018-10",
      "incidents": [
        ...
      ],
      "order": 2,
      "count": 6
    },
    {
      "id": "2018-9",
      "incidents": [
        ...
      ],
      "order": 3,
      "count": 6
    }
  ]
}
```

### /incidents/timeline <Badge text="get" />

Get all Incidents of the past 7 days.

|     |         Static Generated         |    Server Rendered   |
|:---:|:--------------------------------:|:--------------------:|
| URL | /incidents/timeline.`:lang`.json |  /incidents/timeline |

**Example response:**

```json
{
  "count": 8,
  "days": [
    {
      "date": "2018-11-09T00:00:00.000Z",
      "count": 2,
      "incidents": [
        {
          "id": "1a96284b",
          "title": "Conversions Issues",
          "description": "Our Files Conversion System were not responding properly.",
          "date": "2018-11-09T15:48:45.061Z",
          "modified": "2018-11-09T17:48:45.061Z",
          "severity": "degraded-performance",
          "affectedsystems": [
            "api",
            "cdn"
          ],
          "resolved": false,
          "content": "<p>Our Files Conversion System were not responding properly.</p>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T19:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion Process is responding slowly and we've investigating what is causing this issue.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T20:48:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Monitoring</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue. If you're affected by this issue, you can contact us at our <a href=\"https://demo.statusfy.co\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"external\">Support Page</a>.</p>\n</div></div></div>\n<div class=\"update-block\">\n          <div class=\"update-block-date\">2018-11-09T21:18:45.061Z</div>\n          <div class=\"update-block-content\">\n            <div class=\"update-block-title\">Resolved</div>\n            <div class=\"update-block-body\">\n<p>Our Files Conversion System is not responding properly and we've investigating what is causing this issue.</p>\n</div></div></div>\n"
        },
        ...
      ],
      "order": 1
    },
    {
      "date": "2018-11-08T00:00:00.000Z",
      "count": 2,
      "incidents": [
        ...
      ],
      "order": 2
    },
    {
      "date": "2018-11-07T00:00:00.000Z",
      "count": 1,
      "incidents": [
        ...
      ],
      "order": 3
    },
    {
      "date": "2018-11-06T00:00:00.000Z",
      "count": 0,
      "incidents": [],
      "order": 4
    },
    {
      "date": "2018-11-05T00:00:00.000Z",
      "count": 0,
      "incidents": [],
      "order": 5
    },
    {
      "date": "2018-11-04T00:00:00.000Z",
      "count": 0,
      "incidents": [],
      "order": 6
    },
    {
      "date": "2018-11-03T00:00:00.000Z",
      "count": 0,
      "incidents": [],
      "order": 7
    },
    {
      "date": "2018-11-02T00:00:00.000Z",
      "count": 0,
      "incidents": [],
      "order": 8
    }
  ]
}
```

### /systems <Badge text="get" />

Get all Systems.

|     |    Static Generated   | Server Rendered |
|:---:|:---------------------:|:---------------:|
| URL | /systems.`:lang`.json |     /systems    |

**Example response:**

```json
[
  {
    "name": "cdn",
    "status": "degraded-performance",
    "order": 1
  },
  {
    "name": "conversions",
    "status": "operational",
    "order": 2
  },
  {
    "name": "site-delivery",
    "status": "operational",
    "order": 3
  },
  {
    "name": "api",
    "status": "degraded-performance",
    "order": 4
  }
]
```
