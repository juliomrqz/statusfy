# Heroku - Server Rendered

Create a new empty application on Heroku

```bash
heroku create
```

Tell Heroku to install the devDependencies of the project:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Set the host the application should listen to:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

Publish site

```bash
git push heroku master
```
