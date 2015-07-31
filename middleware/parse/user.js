'use strict';

var Session = require('./../../model/parse/Session');

module.exports = function(req, res, next) {
  var handle401 = function(res) {
    res.status(401);
    res.send('Resource protected, you need to register/authenticate first.');
  };
  var sessionToken = req.headers['session-key'] || req.query['session'];
  if (sessionToken) {
    Session.getUserWithSessionToken(sessionToken)
      .then(function(user) {
        req.user = user;
        next();
      })
      .catch(function(err) {
        console.error(err);
        handle401(res);
      });
  } else {
    handle401(res);
  }
};
