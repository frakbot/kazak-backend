'use strict';

var Q = require('q');

var fAuthWithCustomToken = function(db, secret) {
  return Q.ninvoke(db, 'authWithCustomToken', secret);
};

var fSet = function(db, elements) {
  return Q.ninvoke(db, 'set', elements);
};

var fPush = function(db, element) {
  return Q.ninvoke(db, 'push', element);
};

var fOn = function(query) {
  var deferred = Q.defer();
  query.on('value', deferred.resolve);
  return deferred.promise.then(function(element) {
    return element.val();
  });
};

var fOnce = function(query) {
  var deferred = Q.defer();
  query.once('value', deferred.resolve);
  return deferred.promise.then(function(element) {
    return element.val();
  });
};

module.exports = {
  authWithCustomToken: fAuthWithCustomToken,
  set: fSet,
  push: fPush,
  on: fOn,
  once: fOnce
};
