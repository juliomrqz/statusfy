---
title: "Release v0.2.0"
slug: "statusfy-release-0-2-0"
author: patriciajumper
description: "We just released a new version of Statusfy with new big features that can improve the users/customer experience of your Status Page System: Scheduled Maintenance, Notifications and Sitemap."
published: "2018-12-11T16:25:29Z"
created: "2018-12-11T16:25:29.723915Z"
canonical: https://www.bazzite.com/blog/statusfy-release-0-2-0
---

We just released a [new version][github-release] of Statusfy with new big features that can improve the user experience of your Status Page System: ***Scheduled Maintenance***, ***Notifications***, and ***Sitemap***.


## Scheduled Maintenance

<ImageResponsive
  source="blog/statusfy-release-v-0-2-0/scheduled-maintenance-en.jpg"
  alt="Statusfy - Scheduled Maintenance"
  :fluid="true"
  :width="879"
  :height="278"
/>

[Scheduled Maintenances][docs-scheduled-maintenance] definition is a way to let your users know ahead of time when your system(s) cannot handle requests due to a temporary maintenance update.

We tried to keep the definition of Scheduled Maintenance as simple as possible sharing the same parameters as regular incidents but adding two new parameters: [***scheduled***][docs-scheduled-maintenance] and [***duration***][docs-scheduled-maintenance].


## Notifications

With the new [Notifications feature][docs-notifications], you can keep your users notified with any Incidents update your System may have. Viewers of your Status Page can access the Choices bellow by clicking a Subscribe button.

- **Atom and RSS Feed:** These feeds include all past Incidents and Scheduled Maintenances. Your users can use Feeds Readers or tools like [IFTT][iftt-rss] and [Zapier][zapier-rss] to receive updates from these feeds.
- **iCalendar:** Your users can subscribe to a calendar containing all of your upcoming and past Scheduled Maintenances. The calendar is published using iCalendar, a popular format which is supported by most modern calendar applications.
- **Twitter:** Define Twitter accounts that your users can access in order to receive updates.
- **Support Site:** Define an external Support Site your users can access in order to receive updates from other sources you may want to provide.

***Most of these Notifications Choices are enabled by default but you can disable them in your config file. More info [here][docs-docs-notifications].***

## Sitemap

Now you can notify to  the search engine bots the available pages in your Status Page System with a **Sitemap**. This can help all the pages in your system to be found more easily.


## Contribute to Statusfy

Statusfy is a completely open source project, created and maintained by [Bazzite][bazzite-home]. It's still a work in progress, so any contribution is very welcome. We're passionate about building a versatile and a lower cost solution.

You can also support us by giving a [GitHub star ★][statusy-github], spreading the word or <NuxtLink :to="`${localePath('support')}#sponsoring`">donating</NuxtLink> 🤓.



[bazzite-home]: https://www.bazzite.com
[statusy-github]: https://github.com/bazzite/statusfy
[docs-scheduled-maintenance]: https://docs.statusfy.co/guide/incidents.html#scheduled-maintenance
[docs-notifications]: https://docs.statusfy.co/guide/notifications.html
[docs-docs-notifications]: https://docs.statusfy.co/config/#notifications
[github-release]: https://github.com/bazzite/statusfy/releases/tag/v0.2.0
[iftt-rss]: https://ifttt.com/feed
[zapier-rss]: https://zapier.com/apps/rss/integrations
