'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;
var _ = require('lodash');
var http = require('axios');
var Q = require('q');

var config = require('./../../lib/config');

var LOGIN_ERROR_CODE = 401;
var LOGIN_ERROR_MESSAGE = 'Wrong login data.';
var LOGIN_ERROR_NO_INFO_MESSAGE = 'No login information available.';

var User = ParseClass('_User', ['username', 'email']);

User.findByEmail = function(email) {
  var query = new Parse.Query(User);
  query.equalTo('email', email);
  return query.first();
};

User.createFromEmailAuth = function(email, auth) {
  var user = new User();
  user.email = email;
  user.username = email;
  // generate a dummy password just because it is required (duh)
  var password = new Buffer(24);
  _.times(24, function(i) {
    password[i] = _.random(0, 255);
  });
  user.set('password', password.toString('base64'));
  return user.signUp();
};

User.get = function(id) {
  return new Parse.Query(User)
    .get(id)
    .then(function(elem) {
      return elem.convert();
    });
};

User.login = function(req, res) {
  if (req.body.hasOwnProperty('facebook') || req.body.hasOwnProperty('twitter') ||
      (req.query.hasOwnProperty('username') && req.query.hasOwnProperty('password'))) {
    return parseLogin(req.body, req.query.username, req.query.password, res);
  }
  if (req.body.hasOwnProperty('google')) {
    return googleLogin(req.body.google, res);
  }
  res.status(LOGIN_ERROR_CODE);
  res.send({
    error: LOGIN_ERROR_NO_INFO_MESSAGE
  });
};

var buildParseLogin = function(data, username, password) {
  var request = {
    headers: {
      'X-Parse-Application-Id': config.getApplicationKey(),
      'X-Parse-REST-API-Key': config.getRestKey(),
      'X-Parse-Revocable-Session': 1
    }
  };
  if (data && Object.keys(data).length > 0) {
    request.url = 'https://api.parse.com/1/users';
    request.method = 'POST';
    request.data = {
      authData: data
    };
  } else {
    request.url = 'https://api.parse.com/1/login';
    request.method = 'GET';
    request.params = {username: username, password: password};
  }
  return request;
};

var loginErrorHandler = function(res) {
  return function(err) {
    console.error(err);
    res.status(LOGIN_ERROR_CODE);
    res.send({
      error: LOGIN_ERROR_MESSAGE
    });
  };
};

var parseLogin = function(auth, username, password, res) {
  return http(buildParseLogin(auth, username, password))
    .then(function(response) {
      res.send(response.data);
    })
    .catch(loginErrorHandler(res));
};

var googleLogin = function(googleAuth, res) {
  return http({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + googleAuth.access_token
    }
  })
    .then(function(response) {
      var email = response.data.email;
      return Q.all([User.findByEmail(email), email]);
    })
    .then(function(userEmail) {
      // if the user doesn't exist, make a dummy one
      if (typeof(userEmail[0]) === 'undefined') {
        return User.createFromEmailAuth(userEmail[1], googleAuth);
      }
      return userEmail[1];
    })
    .then(externalLoginWithUser)
    .then(function(response) {
      // response contains the new session
      res.send(response.data);
    })
    .catch(loginErrorHandler(res));
};

var externalLoginWithUser = function(user) {
  var oldSessionToken = user.getSessionToken();
  // exchange the manual session token with the new revocable one which will be stored in _Session
  return http({
    url: 'https://api.parse.com/1/upgradeToRevocableSession',
    method: 'POST',
    headers: {
      'X-Parse-Application-Id': config.getApplicationKey(),
      'X-Parse-REST-API-Key': config.getRestKey(),
      'X-Parse-Session-Token': oldSessionToken
    }
  });
};

module.exports = User;
