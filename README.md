droidcon-backend
================

Attempts at Parse Land.

## Setup

Create a `config.json` file just as the `config.json.example` and replace the dummy keys with the
actual ones you can grab from your Parse app's settings.

Then, install `node` and, in the application root directory, its dependencies:

```shell
$ brew install node
$ cd droidcon-backend
$ npm install
```

## Run

To run, simply execute:

```shell
$ node index.js
```

## Deploy on Heroku

In order to make the application run on Heroku, you need to set the following environment variables:

```shell
$ heroku config:set PARSE_MASTER_KEY=the-master-key
$ heroku config:set PARSE_APP_KEY=the-application-key
$ heroku config:set PARSE_JS_KEY=the-js-key
```
