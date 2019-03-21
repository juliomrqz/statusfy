---
title: "Release v0.3.0"
slug: "statusfy-release-0-3-0"
author: juliomrqz
description: "We just released a new version of Statusfy with new features and performance improvements: Docker support, new commands, three new languages translate the Interface and more."
published: "2019-03-21T14:45:43.472Z"
created: "2019-03-21T14:45:43.472Z"
canonical: https://www.bazzite.com/blog/statusfy-release-0-3-0
---

We just released a [new version][github-release] of Statusfy with new features and performance improvements: Docker support, new commands, three new languages translate the Interface and more.

## CLI

Two new commands are now available: [`delete-incident`][delete-incident] and [`update-incident`][delete-incident]. They are useful if you're managing a huge amount of incidents or multiple languages.

## Scheduled Maintenance

We apply minor improvements to the layout of the Scheduled Incidents: the end date is now displayed as well as the incident content. You can also customize the [position of this section][scheduled-position], choosing one of these options: `belowSystems`, `aboveSystems`, and `aboveGlobalStatus`.

## Docker

We now officially support [Docker][docker]. We don't recommend it for production yet, we need your feedback first in order to make sure that the image works properly.

## New translations:

Three new languages translate the Interface:

  * German (thanks to [Dennis Herzberg](https://github.com/dennis47528))
  * Hungarian (thanks to [Peter Borsa](https://github.com/asrob))
  * Portuguese from Brazil (thanks to [felipeklasen](https://github.com/felipeklasen))

If you're using one of these languages, you no longer need to manually provide a translation file 🤓.

## Statusfy Users

If your company or organization is using Statusfy, we welcome you to leave your feedback, feelings, comments, impressions, and suggestions [here][user-issue].

Your comments will be a great motivation for us to improve Statusfy. We are very grateful for your replies and support.

## Special Acknowledgement

We would like to thank [Thomas Jensen][thomas-jensen] and [Janez Troha][janez-troha] for having contributed financially to the development of Statusfy through [OpenCollective][open-collective]. We are very grateful for their contribution.


## Contribute to Statusfy

Statusfy is a completely [open source project][statusy-github], created and maintained by [Bazzite][bazzite-home]. It's still a work in progress, so any contribution is very welcome. We're passionate about building a versatile and a lower cost solution.

You can also support us by:

  * Giving a [GitHub star ★][statusy-github].
  * [Spreading the word][share-twitter].
  * <NuxtLink :to="`${localePath('support')}#sponsoring`">Donating</NuxtLink>.
  * Or becoming a <NuxtLink :to="`${localePath('support')}#sponsoring`">sponsor</NuxtLink>.


[github-release]: https://github.com/bazzite/statusfy/releases/tag/v0.3.0
[delete-incident]: https://docs.statusfy.co/guide/commands.html#delete-incident
[update-incident]: https://docs.statusfy.co/guide/commands.html#update-incident
[scheduled-position]: https://docs.statusfy.co/config/#scheduled
[docker]: https://hub.docker.com/r/bazzite/statusfy
[thomas-jensen]: https://opencollective.com/thomasjsn
[janez-troha]: https://opencollective.com/janez-troha
[statusy-github]: https://github.com/bazzite/statusfy
[bazzite-home]: https://www.bazzite.com?ref=statusfy
[share-twitter]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fstatusfy.co&via=BazziteTech&text=Statusfy%3A%20A%20marvelous%20Open%20Source%20Status%20Page%20System
[user-issue]: https://github.com/bazzite/statusfy/issues/159
[open-collective]: https://bazzite.xyz/StatusfyOpenCollective#contribute
