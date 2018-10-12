# Estructura de Directorios


```
.
├─ .statusfy/         # (internal)
├─ assets/            # (optional)
├─ content/           # (required)
│   ├── 2018-01-16_incident_1.md
│   ├── 2018-01-17_incident_2.md
│   ├── es
│   │   ├── 2018-01-16_incident_1.md
│   │   └── 2018-01-17_incident_2.md
├─ locales/           # (recomended)
│   ├── en.json
│   └── es.json
├─ public/            # (optional)
│   └── robots.txt
├─ config.js          # (optional)
└─ package.json
```

::: warning Note
Please note the capitalization of the directory name.
:::

- **`.statusfy/`**: It is used to store the built files needed for your application during development or the [production dynamic mode](../guide/deploy.md#dynamic).
- **`assets/`**: The assets directory contains your un-compiled assets such as Images.
- **`content/`**: The markdown source files of your incidents. This file path can be changed, more information [here](../config/README.md#dir).
- **`locales/`**: Directory that contains translations files.
- **`public/`**: Static files directory. Each file inside this directory is mapped to `/`. **For example:** `/public/robots.txt` is mapped as `/robots.txt`.
- **`config.js`**: Your [Config File](../guide/basic-config.md#config-file).
