'use strict';

var buildTalkEndpoint = function(app) {
  var Talk = require('./../model/Talk');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  var getAll = function(req, res) {
    var expansions = req.query.expand;
    var expand = {};
    (expansions || []).forEach(function(val) {
      expand[val] = true;
    });
    Talk.getAll(req.context, expand)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var get = function(req, res) {
    Talk.get(req.context, req.params.talk)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
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
