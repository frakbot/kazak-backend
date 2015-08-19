'use strict';

module.exports = function(req, res, next) {
  req.sessionToken = req.headers['session-key'] || req.query['session'];
  next();
};
