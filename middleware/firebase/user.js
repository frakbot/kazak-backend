'use strict';

module.exports = function(req, res, next) {
  if (!req.user) {
    res.status(401);
    res.send('Resource protected, you need to register/authenticate first.');
    return;
  }
  next();
};
