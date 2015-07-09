'use strict';

var express = require('express');
var bodyParser = require('cloud/helper/bodyParse');
var appMiddleware = require('cloud/middleware/app');
var userMiddleware = require('cloud/middleware/user');

var talks = require('cloud/endpoint/talks');

var app = express();
app.use(bodyParser());

// var Parse = require('parse').Parse;
var config = require('cloud/config');
Parse.initialize(config['appKey'], config['jsKey']);

app.all('/api/*', appMiddleware, userMiddleware);
talks(app);
app.all('/api/*', function(err, req, res, next) {
  console.error(err.stack);
  res.status(503).send('Something broke!');
});

var port = process.env ? 3000 : undefined;
app.listen(port, function () {
  console.log('Web Service started.');
});
