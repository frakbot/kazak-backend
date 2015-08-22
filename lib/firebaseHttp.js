'use strict';

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
  return http({
    url: buildUrl(config, collection, id),
    method: method,
    params: {
      auth: config.secret
    },
    data: data ? JSON.stringify(data) : undefined
  }).then(function(res) {
    return res.data;
  });
};

module.exports = firebaseHttp;
