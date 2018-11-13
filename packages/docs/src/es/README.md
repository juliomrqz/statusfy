---
home: true
heroImage: /hero.bvdrsr4sre5.svg
actionText: Empezemos →
actionLink: /es/guide/
features:
- title: Soporte para Markdown
  details: Simplemente escribe los Incidentes con Markdown y Statusfy generará un conjunto de contenido HTML. Todas las características del formato de Markdown de GitHub son compatibles.
- title: Stack Moderno
  details: "Disfruta del poder de las tecnologías web modernas: Vue.js, Webpack y JavaScript . Escribe estilos CSS con tus preprocesadores favoritos como Sass, Less o Stylus con prefijo automático."
- title: Flexibilidad de Alojamiento
  details: Usa el poder de la Generación de Sitios Estáticos o la Representación del lado del Servidor, de modo que puede implementarse fácilmente en una variedad de servicios de hospedaje sin costos elevados de servidor.
---

### Solo pasos sencillos

``` bash
# instala
npm install -g statusfy # O yarn global add statusfy

# crea un proyecto base
statusfy init

# crea un incidente
statusfy new-incident

# sirve la aplicación en modo de desarrollo
statusfy dev

# genera una aplicación web estática
statusfy generate

# construye para producción y lanza el servidor
statusfy build
statusfy start
```

::: warning NOTA DE COMPATIBILIDAD
Statusfy requiere Node.js >= 8.
:::

<!-- Footer Component -->
<Footer />
