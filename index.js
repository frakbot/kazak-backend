'use strict';

var Parse = require('parse').Parse;
var express = require('express');
var bodyParser = require('body-parser');

var appMiddleware = require('./middleware/app');
var userMiddleware = require('./middleware/user');

var Conference = require('./model/Conference');
var Presenter = require('./model/Presenter');
var TimeSlot = require('./model/TimeSlot');
var Talk = require('./model/Talk');
var Room = require('./model/Room');

var config = require('./lib/config');

var users = require('./endpoint/users');
var rooms = require('./endpoint/rooms');
var timeSlots = require('./endpoint/timeSlots');
var presenters = require('./endpoint/presenters');
var talks = require('./endpoint/talks');

Parse.initialize(config.getApplicationKey(), config.getJavascriptKey(), config.getMasterKey());
Parse.Cloud.useMasterKey();

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(require('./lib/hostHandlers'));
app.use(bodyParser.json());

app.all('/api/*', appMiddleware, userMiddleware);

users(app);
rooms(app);
timeSlots(app);
presenters(app);
talks(app);

app.use(function(err, req, res, next) {
  if (!err) {
    return next();
  }
  console.error(err);
  res.status(500);
  res.send(err);
});

var server = app.listen(app.get('port'), '0.0.0.0', function() {
  console.log('App listening at %s:%s...', server.address().address, server.address().port);
  console.log('Press CTRL+C to quit.');
});
