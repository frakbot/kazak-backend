'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;

var Session = ParseClass('_Session', ['sessionToken', 'user', 'expiresAt']);

Session.exists = function(session) {
  var query = Parse.Query(Session);
  query.equalTo('sessionToken', session);
  return query.first()
    .then(function(session) {
      return session ? true : false;
    });
};

module.exports = Session;
