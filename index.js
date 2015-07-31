'use strict';

var impl = process.argv[2] || 'firebase';

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./lib/config');

if (impl === 'parse') {
  var Parse = require('parse').Parse;
  Parse.initialize(config.getApplicationKey(), config.getJavascriptKey(), config.getMasterKey());
  Parse.Cloud.useMasterKey();
}

var initMiddleware = require('./middleware/' + impl + '/init');
var terminateMiddleware = require('./middleware/' + impl + '/terminate');

var rooms = require('./endpoint/rooms');
var timeSlots = require('./endpoint/timeSlots');
var presenters = require('./endpoint/presenters');
var talks = require('./endpoint/talks');
var schedule = require('./endpoint/schedule');
var users = require('./endpoint/users');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(require('./lib/hostHandlers'));
app.use(bodyParser.json());
app.use(initMiddleware);

rooms(app, impl);
talks(app, impl);
timeSlots(app, impl);
presenters(app, impl);
// schedule(app, impl);
users(app, impl);

app.use(terminateMiddleware);

app.use(function(err, req, res, next) {
  if (!err) {
    return next();
  }
  console.error(err.stack);
  res.status(500);
  res.send(err);
});

var server = app.listen(app.get('port'), '0.0.0.0', function() {
  console.log('App listening at %s:%s...', server.address().address, server.address().port);
  console.log('Press CTRL+C to quit.');
});
