kazak-backend
=============

Backend for kazak-android *(or is kazak-android the frontend for kazak-backend?)*

## Setup

Clone this repo on your machine:

```shell
$ git clone https://github.com/frapontillo/kazak-backend.git && cd kazak-backend
```

### Firebase application

1. Create a new Firebase application and copy its URL (e.g. `https://your-kazak.firebaseio.com`)
2. Go to Admin -> Secrets and generate/copy a custom session token

## NodeJS application

Create a `config.json` file using [`config.json.example`](config.json.example) as a template and 
replace the dummy `url` and `secret` with the actual ones you got before.

Then, install `node` and, in the application root directory, its dependencies:

```shell
$ brew install node
$ cd kazak-backend
$ npm install
```

## Run

To run, simply execute:

```shell
$ gulp
```

## Deploy

### Heroku

In order to make the application run on Heroku, you need to set the following environment variables:

```shell
$ heroku config:set FIREBASE_URL=https://your-kazak.firebaseio.com/
$ heroku config:set FIREBASE_SECRET_KEY=the-firebase-secret
```

### Google Cloud

TODO: write tutorial for Compute Engine/kubectl.
