'use strict';

var config = require('./../lib/config');

module.exports = function(req, res, next) {
  req.context = {
    url: config.firebase.url
  };
  next();
};
