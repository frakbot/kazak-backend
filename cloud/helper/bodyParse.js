'use strict';

var express = require('express');
var bodyParser;

try {
  bodyParser = require('parse-express-raw-body');
} catch (Error) {
  bodyParser = express.json;
}

module.exports = bodyParser;
