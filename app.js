'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var initMiddleware = require('./middleware/init');
var terminateMiddleware = require('./middleware/terminate');

var rooms = require('./endpoint/rooms');
var timeSlots = require('./endpoint/timeSlots');
var presenters = require('./endpoint/presenters');
var events = require('./endpoint/events');
var schedules = require('./endpoint/schedules');
var tracks = require('./endpoint/tracks');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = (env === 'development');

app.use(logger('dev'));
app.use(require('./lib/hostHandlers'));
app.use(bodyParser.json());
app.use(initMiddleware);

rooms(app);
events(app);
timeSlots(app);
presenters(app);
schedules(app);
tracks(app);

app.use(terminateMiddleware);

app.use(function(err, req, res, next) {
  if (!err) {
    return next();
  }
  console.error(err.stack);
  res.status(500);
  res.send(err);
});

module.exports = app;
