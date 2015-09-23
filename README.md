# kazak-backend
[![](https://ci.novoda.com/buildStatus/icon?job=kazak-backend)](https://ci.novoda.com/job/kazak-backend/lastBuild/console)

Backend for [Kazak-Android](https://github.com/novoda/kazak-android) *(or is Kazak-Android the frontend for Kazak-backend?)*

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

## Data entry

There is a set of hardcoded data in bootstrap folder.
To import them run 
```
node bootstrap.js
```
Thereafter, you can add/edit data via the firebase console.

## Run

To run, simply execute:

```shell
$ gulp
```

## Test

You can run tests in multiple modes:

- one-shot on demand: `gulp test`
- continuous test by file watching: `gulp test:auto`

You can also run a code coverage task via `gulp coverage`, that will output under `coverage/`:

- `cobertura/coverage.xml`, XML output for the Jenkins Cobertura plugin
- `html/**/*.*`, website with a nice view of covered LOCs
- `json/coverage.json`, line-by-line coverage details
- `lcov/coverage.lcov`, coverage output in the LCOV format
- `text/coverage.txt` and `text/coverage-summary.txt`, textual summaries

## Deploy

### Heroku

In order to make the application run on Heroku, you need to set the following environment variables:

```shell
$ heroku config:set FIREBASE_URL=https://your-kazak.firebaseio.com/
$ heroku config:set FIREBASE_SECRET_KEY=the-firebase-secret
```

### Google Cloud

TODO: write tutorial for Compute Engine/kubectl.

## Licence

Kazak is licenced under the MIT licence, unless explicitly stated.

	The MIT License (MIT)

	Copyright (c) 2015 The Kazak Contributors

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

## Thanks to

This app couldn't exist without the awesome work of its core team of contributors and everybody that has helped the project.

We want to thank the following companies for contributing to the development by providing access to their technologies and
resources:

[![](https://github.com/novoda/kazak-android/raw/develop/docs/logo_novoda.png)](http://www.novoda.com)

[![](https://github.com/novoda/kazak-android/raw/develop/docs/logo_facebook.png)](http://www.facebook.com)

[![](https://github.com/novoda/kazak-android/raw/develop/docs/logo_google.png)](http://www.google.com)

[![](https://github.com/novoda/kazak-android/raw/develop/docs/logo_jetbrains.png)](http://www.jetbrains.com)
