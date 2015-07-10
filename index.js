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

var talks = require('./endpoint/talks');

Parse.initialize(config.getApplicationKey(), config.getJavascriptKey(), config.getMasterKey());

var app = express();
app.set('port', (process.env.PORT || 5000));

app.all('/api/*', appMiddleware, userMiddleware);
app.use(bodyParser.json());

talks(app);

app.use(function(err, req, res, next) {
  if (!err) {
    return next();
  }
  console.error(err);
  res.status(500);
  res.send(err);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
