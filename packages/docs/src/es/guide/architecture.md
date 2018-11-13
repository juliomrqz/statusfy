# Arquitectura

Statusfy fue diseñado para generar un Sistema de Página de Estado que actúa como Una Aplicación Web con la arquitectura [JAMstack](https://jamstack.org/) en mente. El objetivo detrás es reducir los costos y la complejidad, proporcionando una alternativa [**"Serverless"**](https://serverless.com/learn/overview/) más simple y versátil.

Puede servir tu Sistema de Página de Estado creado con Statusfy de dos maneras diferentes: **Generación Estática** o **Renderizado por Servidor**.

## Generación Estática

Al crear tu Sistema de Páginas de Estado, puedes generar el HTML para cada una de las rutas y almacenarlo en un archivo. Con esto, puedes alojar la aplicación web generada en ¡cualquier hosting estático!.

### Ventajas

- Despliegue a cualquier alojamiento estático.
- Tiempo de respuesta rápido: los hostings estáticos usualmente usan un CDN.
- Reducir tus costos de alojamiento.

### Desventajas

- Debes **regenerar** la aplicación web **al menos una vez al día** para mantener actualizado el cronograma de incidentes en la página de inicio.
- Para un Sistema de Páginas de Estado con una gran cantidad de incidentes, la generación de páginas podría llevar una cantidad significativa de tiempo.



## Renderizado por Servidor

Si deseas reducir el tiempo de implementación o simplemente no desea utilizar un Alojamiento estático, puede considerar la opción Renderizado por Servidor de tu Sistema de Páginas de Estado.

### Ventajas

- Para un sistema de páginas de estado con una gran cantidad de incidentes, el tiempo de generación de las páginas no es un problema.
- Redirección basada en el idioma del navegador del usuario.

### Desventajas

- No se puede utilizar un alojamiento estático.
- Está limitado a usar un servicio de alojamiento que soporte Node.js.
- Un Hosting para Node.js puede ser más costoso que un Hosting Estático.



::: tip NOTA
Node.js es la tecnología backend utilizada para ejecutar Statusfy en un servidor no estático.
:::

