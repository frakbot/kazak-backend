'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;
var http = require('axios');

var config = require('./../lib/config');
var Session = ParseClass('_Session', ['sessionToken', 'user', 'expiresAt']);

Session.getUserWithSessionToken = function(sessionToken) {
  return http({
    url: 'https://api.parse.com/1/sessions',
    method: 'GET',
    headers: {
      'X-Parse-Application-Id': config.getApplicationKey(),
      'X-Parse-REST-API-Key': config.getRestKey(),
      'X-Parse-Revocable-Session': 1,
      'X-Parse-Session-Token': sessionToken
    },
    params: {
      order: '-createdAt',
      limit: 1,
      select: 'user',
      include: 'user'
    }
  })
    .then(function(session) {
      return session.data.results[0].user;
    });
};

module.exports = Session;
