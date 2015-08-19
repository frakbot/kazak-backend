'use strict';

var buildUserEndpoint = function(app) {
  var User = require('./../model/User');

  var login = function(req, res) {
    return User.login(req, res);
  };

  app.post('/api/login', login);
};

module.exports = buildUserEndpoint;
