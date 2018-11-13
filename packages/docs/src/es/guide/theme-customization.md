---
sidebarDepth: 3
---

# Personalización de Estilo


## Estilos

El aspecto de Statusfy se puede cambiar fácilmente con un StyleSheet ubicado en `theme/default/style.{css, less, sass, scss, styl, stylus}`.

### CSS

Usar un archivo CSS (`theme/default/style.css`) es la forma más sencilla de personalizar los estilos. Puede cambiar las variables CSS predefinidas o extender los estilos existentes con cualquier instrucción CSS sin dependencias adicionales.

Estas son las variables CSS disponibles:

|         Variable         |                      Valor por defecto                       |
| :----------------------: | :----------------------------------------------------------: |
|      --transparent       |               <ColorBox color="transparent" />               |
|         --black          |                 <ColorBox color="#1b1f23" />                 |
|      --grey-darkest      |                 <ColorBox color="#586069" />                 |
|      --grey-darker       |                 <ColorBox color="#6a737d" />                 |
|       --grey-dark        |                 <ColorBox color="#959da5" />                 |
|          --grey          |                 <ColorBox color="#d1d5da" />                 |
|       --grey-light       |                 <ColorBox color="#e1e4e8" />                 |
|      --grey-lighter      |                 <ColorBox color="#f6f8fa" />                 |
|     --grey-lightest      |                 <ColorBox color="#fafbfc" />                 |
|         --white          |                 <ColorBox color="#ffffff" />                 |
|          --blue          |                 <ColorBox color="#0366d6" />                 |
|         --purple         |                 <ColorBox color="#6f42c1" />                 |
|         --green          |                 <ColorBox color="#28a745" />                 |
|         --orange         |                 <ColorBox color="#f66a0a" />                 |
|          --red           |                 <ColorBox color="#d73a49" />                 |
|         --yellow         |                 <ColorBox color="#ffd33d" />                 |
| --font-family-sans-serif | system-ui, -apple-system, Segoe UI, <br> Roboto, Ubuntu, Cantarell, Noto Sans, <br> sans-serif, BlinkMacSystemFont, <br> -apple-system, Segoe UI, Roboto, <br> Oxygen, Ubuntu, Cantarell, Fira Sans, <br> Droid Sans, Helvetica Neue, sans-serif |
| --font-family-monospace  | Menlo, Monaco, Consolas, <br> Liberation Mono, Courier New, monospace |

::: tip TIP

Statusfy incluye soporte para [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env), por lo que puedes usar cualquier instrucción CSS moderna de aquí: [PostCSS Preset Env Features](https://preset-env.cssdb.org/features).

:::

### Sass, Less y Stylus

Si deseas utilizar otro preprocesador de CSS, Statusfy soporta estilos en Sass, LESS y Stylus. Pero ten en cuenta que debes instalar dependencias Node.js adicionales:

| Preprocesador CSS |   Extensión(es)   |        Dependencias         |
| :---------------: | :---------------: | :-------------------------: |
|       Less        |      `less`       |   `less-loader` y `less`    |
|     Sass/SCSS     |  `sass` o `scss`  | `sass-loader` y `node-sass` |
|      Stylus       | `styl` o `stylus` | `stylus-loader` y `stylus`  |

Por ejemplo, si deseas extender el estilo de Statusfy usando Stylus, instala primero las dependencias en tu proyecto:

```bash
npm install --save-dev stylus-loader stylus

# o 
yarn add -D stylus-loader stylus
```

y luego define tu estilo personalizado en `theme/default/style.styl` o `theme/default/style.stylus`.

## Archivos

### Logo

Puedes reemplazar el logotipo predeterminado colocando una imagen en la ubicación `theme/default/img/logo.svg`. Los formatos soportados son: `png`, `jpg`, `gif` and `svg`.

### Icono

El icono de la aplicación debe ser colocado en `theme/default/img/icon.png` y se utiliza para generar favicons y los [Iconos de la aplicación](./pwa.md#iconos). Debe ser una imagen cuadrada en formato PNG con un tamaño mínimo de 512px.

### Público

Puedes definir archivos estáticos en el directorio `public/` que se asignarán a la ruta URL `/`. Por ejemplo:

- Puedes crear un archivo Robots.txt en `/public/robots.txt` que se asignará como `/robots.txt`.
- O pegar un archivo de verificación en `/public/google4ddabfacdb4f6795.html` que estará disponible en su sitio en `/google4ddabfacdb4f6795.html`

## Vínculos

Los enlaces externos ubicados en el footer de cada página se pueden personalizar. Solo hay tres enlaces que puedes definir: `home`, `contact` y `support`. Más información en la [Guía de Referencia de Configuración](../config/README.md#links).
