module.exports = {
  title: 'Título',
  description: 'Descripción',
  baseUrl: 'https://demo.statusfy.co',
  defaultLocale: 'es',
  locales: [
    { code: 'es', iso: 'es-ES', name: 'Español' },
    { code: 'fr', iso: 'fr-FR', name: 'Français' }
  ],
  content: {
    frontMatterFormat: 'yaml',
    systems: [
      'notificaciones',
      'monitoreo',
      'entrega-sitio'
    ]
  }
}
