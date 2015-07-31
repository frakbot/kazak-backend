'use strict';

var buildTalkEndpoint = function(app, impl) {
  var Talk = require('./../model/' + impl + '/Talk');

  var getAll = function(req, res, next) {
    Talk.getAll(req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var get = function(req, res, next) {
    Talk.get(req.params.talk, req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var post = function(req, res, next) {
    // TODO
  };

  var put = function(req, res, next) {
    // TODO
  };

  var patch = function(req, res, next) {
    // TODO
  };

  var del = function(req, res, next) {
    // TODO
  };

  app.get('/api/talks', getAll);
  app.get('/api/talks/:talk', get);
  app.post('/api/talks/:talk', post);
  app.put('/api/talks/:talk', put);
  app.patch('/api/talks/:talk', patch);
  app.delete('/api/talks/:talk', del);
};

module.exports = buildTalkEndpoint;
