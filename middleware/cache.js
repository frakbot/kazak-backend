'use strict';

var memcache = require('memory-cache');
var nodeUrl = require('url');
var querystring = require('querystring');

var cleanUrl = function(url) {
  var objUrl = nodeUrl.parse(url);
  objUrl.query = querystring.parse(objUrl.query);
  delete objUrl.query.auth;
  return nodeUrl.format({
    pathname: objUrl.pathname,
    query: objUrl.query
  });
};

module.exports = {
  find: function(req, res, next) {
    var obj = memcache.get(cleanUrl(req.url));
    return obj ? res.send(obj) : next();
  },
  save: function(req, obj) {
    memcache.put(cleanUrl(req.url), obj);
  }
};
