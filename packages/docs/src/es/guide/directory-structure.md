# Estructura de Directorios

Statusfy está diseñado para ser fácil de usar y organizar, teniendo en cuenta la [Internacionalización](../guide/i18n.md), la estructura de documento recomendada es la siguiente:

```bash
.
├─ .statusfy/         # (interno)
├─ assets/            # (opcional)
│   ├── icon.png
│   ├── img
│   │   └── logo.svg
├─ content/           # (requerido)
│   ├── 2018-01-16_incident_1.md
│   ├── 2018-01-17_incident_2.md
│   ├── es            # (opcional)
│   │   ├── 2018-01-16_incident_1.md
│   │   └── 2018-01-17_incident_2.md
├─ locales/           # (recomendado)
│   ├── en.json
│   └── es.json
├─ public/            # (opcional)
│   └── robots.txt
├─ theme/             # (opcional)
│   └── style.css
├─ config.js          # (opcional)
└─ package.json
```

::: warning Nota
La capitalización de los nombres de los directorios es importante para evitar errores.
:::

- **`.statusfy/`**: Se utiliza para almacenar los archivos necesarios para tu aplicación durante el desarrollo o el Modo [Renderizado por Servidor](../guide/architecture.md#renderizado-por-servidor) en Producción.
- **`assets/`**: El directorio de activos contiene tus archivos no compilados, como Imágenes.
- **`content/`**: Esta ruta se puede cambiar, más información en la [Referencia de Configuración](../config/README.md#dir).
- **`locales/`**: Directorio que contiene archivos de traducción. Más información en la [Guía de internacionalización](../guide/i18n.md).
- **`public/`**: Cada archivo dentro de este directorio se asigna a `/`. Por ejemplo: `/public/robots.txt` se asigna como` /robots.txt`.
- **`theme/`**: Directorio que contiene los archivos que te permiten personalizar el estilo de Statusfy. Más información en la [Guía de Personalización de Estilo](../guide/theme-customization.md).
- **`config.js`**: Tu archivo de configuración. Más información en la [Guía de Configuración](../guide/configuration.md#archivo-de-configuracion).
