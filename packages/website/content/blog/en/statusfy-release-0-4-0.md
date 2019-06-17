---
title: "Release v0.4.0"
slug: "statusfy-release-0-4-0"
author: juliomrqz
description: "We just released a new version of Statusfy with Web Push notifications support, performance improvements and a new Interface Translation: Italian."
published: "2019-06-15T13:58:14Z"
created: "2019-06-15T13:58:14Z"
canonical: https://www.bazzite.com/blog/statusfy-release-0-4-0
spectrum:
  - channel: statusfy
  - id: f5befabd-d36e-4256-a69b-0a6474c6942e
---

We just released a new minor [version][github-release] of Statusfy focused on fixing bugs, updating dependencies and improving performance with some new features: [Web Push Notifications](#web-push-notifications), [Offline Analytics](#offline-analytics), and Italian translation. In addition, we have a better place for your questions and doubts, our [Community Chat][community-chat] 🤓.

## Web Push Notifications

Your users can now subscribe to [Web Push notifications][statusfy-docs-web-push] from their browsers. These notifications can only be sent to users who have opted-in to receive these notifications. 

Currently, this feature is supported by OneSignal, a Free, high volume and reliable push notification service for websites and mobile applications. In the future, we plan to support more providers, If you have one in mind, please suggest it in the [Community Chat][community-chat].

## Offline Analytics

The Offline Support and browser caching are provided by **Workbox**, a Google Javascript library that makes these tasks easy. We updated it to the latest version, which brings better performance and **Offline Google Analytics**: you can still  understanding how users are interacting with your Status Page System even when  they don't have connectivity. 

## Community chat

We believe that the success of any product is largely defined by the **interaction** and the **strong connection** with users. That's why we decided to create a communication channel for Statusfy in our [Community Chat][community-chat]. Any questions, doubts or concerns are welcome.

## Feedback, impressions and suggestions

If your organization is using Statusfy, we welcome you to leave your feedback, impressions, and suggestions in our [community chat][user-issue].

## Support us 🙏

One of the main Goals of Statusfy is **saving you money**. This project is completely [open source][statusy-github] and it's still a work in progress, so any contribution is very welcome.

**If you use Statusfy at your company, please consider contributing to our [OpenCollective][open-collective].**


[statusfy-docs-web-push]: https://docs.statusfy.co/guide/notifications/#web-push
[github-release]: https://github.com/bazzite/statusfy/releases/tag/v0.4.0
[statusy-github]: https://github.com/bazzite/statusfy
[open-collective]: https://bazzite.xyz/StatusfyOpenCollective#contribute
[community-chat]: https://spectrum.chat/bazzite/statusfy
[user-issue]: https://spectrum.chat/bazzite/statusfy/statusfy-users~0e09d9ec-ea7a-4a19-985e-ba35045d8a55
