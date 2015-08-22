'use strict';

module.exports = function(req, res, next) {
  req.context.secret = req.query['auth'] || req.headers['auth-key'];
  if (!req.context.secret) {
    res.status(401);
    res.send('Resource protected, you need to register/authenticate first.');
    return;
  }
  next();
};
