'use strict';

module.exports = function(req, res, next) {
  // TODO: get the real app from the request API key
  req.app = 'kazak-android';
  next();
};
