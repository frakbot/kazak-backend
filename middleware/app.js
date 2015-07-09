'use strict';

module.exports = function (req, res, next) {
  req.app = 'droidcon-android';
  next();
};
