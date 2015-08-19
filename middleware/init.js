'use strict';

var config = require('./../lib/config');

module.exports = function(req, res, next) {
  req.context = {
    url: config.firebase.url,
    secret: req.headers['session-key'] || req.query['session']
  };
  next();
};
