'use strict';

var url = require('url');
var http = require('request-promise');

var buildUrl = function(config, collection, id) {
  var path = collection;
  if (id) {
    path += '/' + id;
  }
  path += '.json';
  return url.resolve(config.url, path);
};

var firebaseHttp = function(method, config, collection, id, data) {
  return http({
    uri: buildUrl(config, collection, id),
    method: method,
    qs: {
      auth: config.secret
    },
    body: JSON.stringify(data)
  }).then(function(result) {
    return JSON.parse(result);
  });
};

module.exports = firebaseHttp;
