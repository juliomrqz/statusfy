module.exports = {
  title: "Título",
  name: "Nombre Aplicación",
  description: "Descripción",
  baseUrl: "https://demo-es.statusfy.co",
  defaultLocale: "es",
  locales: [
    { code: "es", iso: "es-ES", name: "Español" },
    { code: "fr", iso: "fr-FR", name: "Français" }
  ],
  content: {
    frontMatterFormat: "yaml",
    systems: ["notificaciones", "monitoreo", "entrega-sitio"]
  }
};
