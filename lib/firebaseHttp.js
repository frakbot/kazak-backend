'use strict';

var Q = require('q');
var url = require('url');
var http = require('axios');

var buildUrl = function(config, collection, id) {
  var path = collection;
  if (id) {
    path += '/' + id;
  }
  path += '.json';
  return url.resolve(config.url, path);
};

var firebaseHttp = function(method, config, collection, id, data) {
  var deferred = Q.defer();
  http({
    url: buildUrl(config, collection, id),
    method: method,
    params: {
      auth: config.secret
    },
    data: JSON.stringify(data)
  }).then(function(res) {
    deferred.resolve(res.data);
  }, function(err) {
    deferred.reject(err);
  });
  return deferred.promise;
};

module.exports = firebaseHttp;
