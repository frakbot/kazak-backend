'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;
var _ = require('lodash');

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

module.exports = User;
