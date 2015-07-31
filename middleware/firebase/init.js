'use strict';

var Firebase = require('firebase');
var config = require('./../../lib/config');
var Helper = require('./../../lib/firebase/helper');

module.exports = function(req, res, next) {
  var sessionToken = req.headers['session-key'] || req.query['session'];

  // if we have a user, authenticate it and proceed
  if (sessionToken) {
    var context = new Firebase.Context();
    var authRef = new Firebase(config.getFirebaseUrl(), context);

    Helper.auth(authRef, sessionToken)
      .then(function(authData) {
        req.user = authData;
        req.dataLayer = authRef;
        req.context = context;
        next();
      });
  } else {
    // with no user, get the default Firebase instance
    req.dataLayer = new Firebase(config.getFirebaseUrl());
    next();
  }
};
