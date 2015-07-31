'use strict';

module.exports = function(req, res, next) {
  if (req.context) {
    context.interrupt();
  }
  next();
};
