---
sidebarDepth: 3
---

# Deploying

You can deliver your Status Page System created with Statusfy in two different ways: **Static Generated** or **Server Rendered**.

## Static Generated

When building your Status Page System, you can generate the HTML for every one of the routes and store it in a file. With this, you can host the generated web application on any static hosting!

### Advantages

- Deploy to any static hosting.
- Fast Response Time: static hostings usually use a CDN.
- Reduce your hosting costs.

### Disavantages

- You must **regenerate** the web application **at least once a day** in order to keep updated the Incidents Timeline on the Homepage.
- For a Status Page System with a huge amount of Incidents, the pages generation could take a significant amount of time.

## Server Rendered

If you want to reduce your deployment time or just not want to use a Static Hosting, you may consider Server Render your Status Page System.

### Advantages

- For a Status Page System with a huge amount of Incidents, the pages generation time is not an issue.
- Redirection based on user's browser language

### Disavantages

- You can't use a static hosting.
- You are limited to use a hosting service that supports Node.js.
- Node.js Hosting can be more expensive than a Static Hosting.

::: tip NOTE
Node.js is used as the backend technology used to run the Status Page System in a Server.
:::

## Services

We listed a few diferent services you can use for hosting your Status Page System. Take into consideration the supported site delivery for each service:

|    Service   |  Static Generated  |            Server Rendered             |
|:------------:|:------------------:|:--------------------------------------:|
| S3/Cloudfront | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
| GitHub Pages | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
| GitLab Pages | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
| Netlify      | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
| Firebase     | <FeatureSupport /> |           <FeatureSupport />           |
| Surge        | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
| Heroku       | <FeatureSupport /> |           <FeatureSupport />           |
| Now          | <FeatureSupport /> |           <FeatureSupport />           |


The following guides are based on a few shared assumptions:

- You are using the default build output location (./dist);
- Statusfy is installed as a local dependency in your project, and you have set up the following npm scripts:

``` json
{
  "scripts": {
    "dev": "statusfy dev",
    "generate": "statusfy generate",
    "build": "statusfy build",
    "start": "statusfy start"
  }
}
```

### S3/Cloudfront


#### References

- [Gatsby: Deploying to S3/Cloudfront](https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront)

### GitHub Pages


#### References

- [Gatsby: How Gatsby Works with GitHub Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)
- [Nuxt: How to deploy on GitHub Pages?](https://nuxtjs.org/faq/github-pages)
- [VuePress: Deploying to GitHub Pages](https://vuepress.vuejs.org/guide/deploy.html#github-pages)


### GitLab Pages and GitLab CI

#### References

- [Gatsby: Deploying to GitLab Pages](https://www.gatsbyjs.org/docs/deploying-to-gitlab-pages/)
- [VuePress: Deploying to GitLab Pages and GitLab CI](https://vuepress.vuejs.org/guide/deploy.html#gitlab-pages-and-gitlab-ci)

### Netlify


#### References

- [Gatsby: Hosting on Netlify](https://www.gatsbyjs.org/docs/hosting-on-netlify)
- [Nuxt: How to deploy on Netlify?](https://nuxtjs.org/faq/netlify-deployment)
- [VuePress: Deploying to Netlify](https://vuepress.vuejs.org/guide/deploy.html#netlify)

### Firebase


#### References

- [VuePress: Deploying to Firebase](https://vuepress.vuejs.org/guide/deploy.html#google-firebase)


### Surge

#### References

- [Nuxt: How to deploy with Surge?](https://nuxtjs.org/faq/surge-deployment)
- [VuePress: Deploying to Surge](https://vuepress.vuejs.org/guide/deploy.html#surge)


### Heroku

#### Static Generated

##### References

- [Gatsby: Deploying to Heroku](https://www.gatsbyjs.org/docs/deploying-to-heroku/)
- [VuePress: Deploying to Heroku](https://vuepress.vuejs.org/guide/deploy.html#heroku)

#### Server Rendered

##### References

- [Nuxt: How to deploy on Heroku?](https://nuxtjs.org/faq/heroku-deployment)



#### Server Rendered


### Now


#### Static Generated

##### References

- [Gatsby: Deploying to Now](https://www.gatsbyjs.org/docs/deploying-to-now/)
- [VuePress: Deploying to Now](https://vuepress.vuejs.org/guide/deploy.html#now)

#### Server Rendered

##### References

- [Nuxt: How to deploy with Now?](https://nuxtjs.org/faq/now-deployment)
