# Primeros Pasos

::: warning COMPATIBILITY NOTE
Statusfy requires Node.js >= 8.
:::


## Using the `statusfy init` command

``` bash
# install globally
npm install -g statusfy # OR yarn global add statusfy

# initialization command
statusfy init

# and answer the require questions:
# ? Title of the Website
# ? Description of the Website.
# ? Code of the Default Language (e.g. en-US) (en-US)
# ? Default Front Matter format for your Incidents
# ? Format of the main Config file

# create an incident
statusfy new-incident

# serve the application in development mode
statusfy dev

# generate a static web application
statusfy generate

# build for production and launch server
statusfy build
statusfy start
```


## Inside an Existing Project

