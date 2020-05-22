# Heroku

Create a new empty application on Heroku

```bash
heroku create
```

Set buildpack for static sites

```bash
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

Publish site

```bash
git push heroku master
```
