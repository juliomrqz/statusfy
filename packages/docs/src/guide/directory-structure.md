# Directory Structure

Statusfy is designed to be easy to use and organize with [Internationalization](../guide/i18n.md) in mind, the recommended document structure is as follows:

```bash
.
├─ .statusfy/         # (internal)
├─ assets/            # (optional)
│   ├── icon.png
│   ├── img
│   │   └── logo.svg
├─ content/           # (required)
│   ├── 2018-01-16_incident_1.md
│   ├── 2018-01-17_incident_2.md
│   ├── es            # (optional)
│   │   ├── 2018-01-16_incident_1.md
│   │   └── 2018-01-17_incident_2.md
├─ locales/           # (recomended)
│   ├── en.json
│   └── es.json
├─ public/            # (optional)
│   └── robots.txt
├─ theme/             # (optional)
│   └── style.css
├─ config.js          # (optional)
└─ package.json
```

::: warning Note
The capitalization of the directories names is important in order to avoid errors.
:::

- **`.statusfy/`**: It is used to store the built files needed for your application during development or the Production [Server Rendered Mode](../guide/architecture.md#server-rendered).
- **`assets/`**: The assets directory contains your un-compiled assets such as Images.
- **`content/`**: The Markdown source files of your Incidents. This file path can be changed, more information in the [Config Reference](../config/README.md#dir).
- **`locales/`**: Directory that contains translations files. More information in the [Internationalization Guide](../guide/i18n.md).
- **`public/`**: Static files directory. Each file inside this directory is mapped to `/`. For example: `/public/robots.txt` is mapped as `/robots.txt`.
- **`theme/`**: Directory that contains the files that allow you to customize the Style of Statusfy. More information in the [Theme Customization Guide](../guide/theme-customization.md).
- **`config.js`**: Your Configuration File. More information in the [Configuration Guide](../guide/configuration.md#config-file).
