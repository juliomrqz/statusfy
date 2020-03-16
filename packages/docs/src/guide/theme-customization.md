---
title: Theme Customization
description: The look of Statusfy can be easily updated with a StyleSheet, also you easily can change the logo and icon of your System, among other things.
date: 2018-10-12T17:28:04Z
sidebarDepth: 3
permalink: /guide/theme-customization
---

# Theme Customization

The look of Statusfy can be easily updated with a StyleSheet, also you easily can change the logo and icon of your System, among other things.

## Styles

The look of Statusfy can be easily changed with a StyleSheet located at `theme/default/style.{css, less, sass, scss, styl, stylus}`.

### CSS

Using a CSS file (`theme/default/style.css`) is the simplest way to customize the styles. You can change the predefined CSS variables or extend the existing styles with any CSS instruction without extra dependencies.

These are the available CSS variables:

|         Variable         |                                                                                                                   Default Value                                                                                                                  |
|:------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|       --transparent      |                                                                                                                 <ColorBox color="transparent" />                                                                                                                      |
|          --black         |                                                                                                                   <ColorBox color="#1b1f23" />                                                                                                                        |
|      --grey-darkest      |                                                                                                             <ColorBox color="#586069" />                                                                                                                              |
|       --grey-darker      |                                                                                                             <ColorBox color="#6a737d" />                                                                                                                              |
|        --grey-dark       |                                                                                                             <ColorBox color="#959da5" />                                                                                                                              |
|          --grey          |                                                                                                             <ColorBox color="#d1d5da" />                                                                                                                              |
|       --grey-light       |                                                                                                             <ColorBox color="#e1e4e8" />                                                                                                                              |
|      --grey-lighter      |                                                                                                             <ColorBox color="#f6f8fa" />                                                                                                                              |
|      --grey-lightest     |                                                                                                             <ColorBox color="#fafbfc" />                                                                                                                              |
|          --white         |                                                                                                             <ColorBox color="#ffffff" />                                                                                                                              |
|          --blue          |                                                                                                             <ColorBox color="#0366d6" />                                                                                                                              |
|         --purple         |                                                                                                             <ColorBox color="#6f42c1" />                                                                                                                              |
|          --green         |                                                                                                             <ColorBox color="#28a745" />                                                                                                                              |
|         --orange         |                                                                                                             <ColorBox color="#f66a0a" />                                                                                                                              |
|           --red          |                                                                                                             <ColorBox color="#d73a49" />                                                                                                                              |
|         --yellow         |                                                                                                             <ColorBox color="#ffd33d" />                                                                                                                              |
| --font-family-sans-serif | system-ui, -apple-system, Segoe UI, <br> Roboto, Ubuntu, Cantarell, Noto Sans, <br> sans-serif, BlinkMacSystemFont, <br> -apple-system, Segoe UI, Roboto, <br> Oxygen, Ubuntu, Cantarell, Fira Sans, <br> Droid Sans, Helvetica Neue, sans-serif |
|  --font-family-monospace |                                                                                       Menlo, Monaco, Consolas, <br> Liberation Mono, Courier New, monospace                                                                                      |

::: tip TIP
Statusfy includes support for [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env), so you can use any modern CSS instructions from here: [PostCSS Preset Env Features](https://preset-env.cssdb.org/features).
:::

### Sass, Less, and Stylus

If you want to use another CSS preprocessor, Statusfy supports styles from Sass, LESS and Stylus. But take into consideration that you must install extra Node.js dependencies:

| CSS Preprocessor |    Extension(s)    |          Dependencies         |
|:----------------:|:------------------:|:-----------------------------:|
|       Less       |       `less`       |    `less-loader` and `less`   |
|     Sass/SCSS    |  `sass` or `scss`  | `sass-loader` and `node-sass` |
|      Stylus      | `styl` or `stylus` |  `stylus-loader` and `stylus` |

For example, if you want to extend the Statusfy style using Stylus, install first the dependencies in your project:

```bash
npm install --save-dev stylus-loader stylus

# or 
yarn add -D stylus-loader stylus
```

and then define your custom style in `theme/default/style.styl` or `theme/default/style.stylus`.

## Assets

### Logo

You can replace the default logo placing an image at the location `theme/default/img/logo.svg`. The supported formats are: `png`, `jpg`, `gif` and `svg`.

### Icon

The Icon of the application must be placed at `theme/default/img/icon.png` and it's used to generate favicons and the [App Icons](./pwa.md#icons). It should be a square image in PNG format with a minimum size of 512px.

### Public


You can define static files in the `public/` directory that will be mapped to the `/` URL path. For example:

- You can create a Robots.txt file in `/public/robots.txt` that will be mapped as `/robots.txt`.
- Or paste a verification file in `/public/google4ddabfacdb4f6795.html` that will be available in your site at `/google4ddabfacdb4f6795.html`

## Links

The external links located at the footer of each page can be customized. There are only five links you can define: `home`, `contact`, `support`, `legal` and `privacy`. More information in the [Config Reference Guide](../config/README.md#links).
