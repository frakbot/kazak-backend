'use strict';

module.exports = function (req, res, next) {
  req.user = 'frapontillo';
  next();
};
