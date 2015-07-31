'use strict';

var buildUserEndpoint = function(app, impl) {
  var User = require('./../model/' + impl + '/User');

  var login = function(req, res) {
    return User.login(req, res);
  };

  app.post('/api/login', login);
};

module.exports = buildUserEndpoint;
