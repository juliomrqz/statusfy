module.exports = {
  buildTime: new Date(),

  config: {
    title: "Demo System Status",
    short_title: "System Status",
    description: "A marvelous open source Status Page system",
    baseUrl: "https://statusfy.marquez.co",
    analytics: {
      ga: "UA-XXXXXXXXX-Y",
      mixpanel: "mixpanel-token",
      facebook: "facebook-token",
      segment: "segment-token",
    },
    defaultLocale: "en",
    locales: [
      { code: "en", iso: "en-US", name: "English" },
      { code: "es", iso: "es-ES", name: "Español" },
    ],
    content: {
      frontMatterFormat: "yaml",
      systems: ["cdn", "conversions", "site-delivery", "api"],
    },
    head: {
      link: [
        {
          rel: "mask-icon",
          href: "/icons/safari-pinned-tab.svg",
          color: "#3e4e88",
        },
      ],
    },
    theme: {
      links: {
        // TODO: sort when generating
        en: {
          home: "https://marquez.co/statusfy",
          contact: "https://marquez.co/statusfy#support",
          support: "https://marquez.co/statusfy#support",
          privacy: "https://marquez.co/legal/privacy",
          legal: "https://marquez.co/legal/terms",
        },
        es: {
          home: "https://marquez.co/es/products/statusfy",
          contact: "https://marquez.co/es/products/statusfy#support",
          support: "https://marquez.co/es/products/statusfy#support",
          privacy: "https://marquez.co/es/legal/privacy",
          legal: "https://marquez.co/es/legal/terms",
        },
      },
    },
    notifications: {
      twitter: {
        en: "juliomrqz",
        es: "juliomrqz",
      },
      support: {
        en: "https://marquez.co/statusfy#support",
        es: "https://marquez.co/es/products/statusfy#support",
      },
      webpush: {
        onesignal: {
          appId: "0c13819d-dd92-4c3e-a554-e7ab14c561af",
        },
      },
    },
  },

  en: {
    title: "Demo System Status",
    description: "A marvelous open source Status Page system",
    systems: {
      items: {
        cdn: {
          title: "CDN",
        },
        conversions: {
          title: "Conversions",
          description: "Conversion from one file to another",
        },
        "site-delivery": {
          title: "Site delivery",
        },
        api: {
          title: "API",
          description: "The API Endpoints any developers can access to",
        },
      },
    },

    // "title": "System Status",
    // "description": "Keep up to date with real-time and historical interruptions to our service which may be affecting you.",
    labels: {
      contact: "Contact",
      support: "Support",
      home: "Home",
      "powered-by": "Powered by",
      legal: "Legal Notice",
      privacy: "Data Privacy",
    },
    statuses: {
      "under-maintenance": "Under Maintenance",
      "degraded-performance": "Degraded Performance",
      "partial-outage": "Partial Outage",
      "major-outage": "Major Outage",
      operational: "Operational",
    },
    dates: {
      formats: {
        short: "MMM D, YYYY",
        long: "MMM D, HH:mm UTC",
        month: "MMMM YYYY",
      },
    },
    incidents: {
      incidents: "Incidents",
      incident: "Incident",
      scheduled: "Scheduled Maintenance",
      "incidents-history": "Incidents History",
      "incidents-history-description":
        "Current & Historical operational interruptions to our service.",
      "incidents-history-days-since-latest":
        "1 day since last incident | {days} days since last incident",
      "latest-incidents": "Latest Incidents",
      "current-status": "Current Status",
      "current-status-description":
        "Keep up to date with real-time and historical interruptions to our service which may be affecting you.",
      "no-incidents": "No incidents reported.",
      resolved: "Resolved",
      unresolved: "Unresolved",
      paginator: {
        previous: "Previous Page",
        next: "Next Page",
        page: "Page",
      },
      collapse: {
        show: "Show all {count} Incidents",
        hide: "Show less Incidents",
      },
    },
    error: {
      "go-back-link": "Go back to homepage",
      "404": {
        title: "Page not found",
        description: "The page you were looking for was not found",
      },
      other: {
        title: "An error occurred",
        description: "We're sorry, but we cannot fulfill your request",
      },
    },
    // "systems": {
    //   "items": {
    //     "cdn": {
    //       "title": "CDN"
    //     },
    //     "dns": {
    //       "title": "DNS"
    //     },
    //     "site-delivery": {
    //       "title": "Site delivery"
    //     },
    //     "api": {
    //       "title": "API",
    //       "description": "The API Endpoints any developers can access to"
    //     }
    //   }
    // },
    notifications: {
      title: "Subscribe to Updates",
      description:
        "Choose from the options below to automatically receive status updates.",
      buttons: {
        subscribe: "Subscribe",
        close: "Close",
      },
      items: {
        icalendar: {
          title: "Calendar",
          description:
            'Receive <strong>Scheduled Maintenances</strong> via <a href="{url}" target="_blank" rel="noopener">iCalendar</a>.',
        },
        feeds: {
          title: "Feeds",
          description:
            'Get <a href="{atom_url}" target="_blank" rel="noopener">the Atom Feed</a> or <a href="{rss_url}" target="_blank" rel="noopener">the RSS Feed</a>.',
        },
        twitter: {
          title: "Twitter",
          description:
            'or <a href="https://twitter.com/{username}" target="_blank" rel="noopener">view our Profile</a>.',
        },
        support: {
          title: "Support",
          description:
            'Visit our <a href="{url}" target="_blank" rel="noopener">Support Site</a>.',
        },
        webpush: {
          title: "Push",
          description: "Notifications delivered to your browser.",
          enable: "Enable Notifications",
          enabled: "Notifications are enabled for this browser.",
        },
      },
    },
  },
  es: {
    title: "Demo del Estado del Sistema",
    description:
      "Un maravilloso Sistema de Página de Estado de código abierto.",
    systems: {
      items: {
        cdn: {
          title: "CDN",
        },
        conversions: {
          title: "Conversiones",
          description: "Conversión de un archivo a otro",
        },
        "site-delivery": {
          title: "Entrega del Sitio",
        },
        api: {
          title: "API",
          description:
            "Los puntos finales del API a los que cualquier desarrollador puede acceder",
        },
      },
    },

    // "title": "Estado del Sistema",
    // "description": "Mantente al día con las interrupciones históricas y en tiempo real de nuestro servicio que pueden estar afectándote.",
    labels: {
      contact: "Contacto",
      support: "Soporte",
      home: "Inicio",
      "powered-by": "Respaldado por",
      legal: "Aviso Legal",
      privacy: "Protección de Datos",
    },
    statuses: {
      "under-maintenance": "En Mantenimiento",
      "degraded-performance": "Rendimiento Degradado",
      "partial-outage": "Interrupción Parcial",
      "major-outage": "Interrupción Mayor",
      operational: "Operativo",
    },
    dates: {
      formats: {
        short: "MMM D, YYYY",
        long: "MMM D, HH:mm UTC",
        month: "MMMM YYYY",
      },
    },
    incidents: {
      incidents: "Incidentes",
      incident: "Incidente",
      scheduled: "Mantenimiento Programado",
      "incidents-history": "Historial de Incidentes",
      "incidents-history-description":
        "Interrupciones operativas actuales e históricas de nuestro servicio.",
      "incidents-history-days-since-latest":
        "1 día desde el último incidente | {days} días desde el último incidente",
      "latest-incidents": "Últimos Incidentes",
      "current-status": "Estado Actual",
      "current-status-description":
        "Mantente al día con las interrupciones históricas y en tiempo real de nuestro servicio que pueden estar afectándote.",
      "no-incidents": "No se reportaron incidentes.",
      resolved: "Resuelto",
      unresolved: "Sin Resolver",
      paginator: {
        previous: "Página Anterior",
        next: "Siguiente Página",
        page: "Página",
      },
      collapse: {
        show: "Mostrar todos los {count} incidentes",
        hide: "Mostrar menos incidentes",
      },
    },
    error: {
      "go-back-link": "Volver a la página de inicio",
      "404": {
        title: "Página no encontrada",
        description: "La página que estabas buscando no fue encontrada",
      },
      other: {
        title: "Ocurrió un error",
        description: "Lo sentimos, pero no podemos cumplir con tu solicitud",
      },
    },
    // "systems": {
    //   "items": {
    //     "cdn": {
    //       "title": "CDN"
    //     },
    //     "dns": {
    //       "title": "DNS"
    //     },
    //     "site-delivery": {
    //       "title": "Entrega del Sitio"
    //     },
    //     "api": {
    //       "title": "API",
    //       "description": "Los puntos finales del API a los que cualquier desarrollador puede acceder"
    //     }
    //   }
    // },
    notifications: {
      title: "Suscribirse a Actualizaciones",
      description:
        "Elija entre las siguientes opciones para recibir automáticamente actualizaciones de estado.",
      buttons: {
        subscribe: "Suscribirse",
        close: "Cerrar",
      },
      items: {
        icalendar: {
          title: "Calendario",
          description:
            'Recibe <strong>Mantenimientos Programados</strong> a través de <a href="{url}" target="_blank" rel="noopener">iCalendar</a>.',
        },
        feeds: {
          title: "Feeds",
          description:
            'Obtén feeds <a href="{atom_url}" target="_blank" rel="noopener">Atom</a> o <a href="{rss_url}" target="_blank" rel="noopener">RSS</a>.',
        },
        twitter: {
          title: "Twitter",
          description:
            'o <a href="https://twitter.com/{username}" target="_blank" rel="noopener">visita Nuestro Perfil</a>.',
        },
        support: {
          title: "Soporte",
          description:
            'Visita nuestro <a href="{url}" target="_blank" rel="noopener">Sitio de Soporte</a>.',
        },
        webpush: {
          title: "Push",
          description: "Notificaciones entregadas a tu navegador.",
          enable: "Activar Notificaciones",
          enabled: "Las notificaciones están habilitadas para este navegador.",
        },
      },
    },
  },
};
