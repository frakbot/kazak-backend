'use strict';

var cacheMiddleware = require('./../middleware/cache');

var buildEventEndpoint = function(app) {
  var Event = require('./../model/Event');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  var getAll = function(req, res) {
    var expansions = req.query.expand;
    if (typeof(expansions) === 'string') {
      expansions = [expansions];
    }
    var expand = {};
    (expansions || []).forEach(function(val) {
      expand[val] = true;
    });
    Event.getAll(req.context, expand)
      .then(function(data) {
        cacheMiddleware.save(req, data);
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var get = function(req, res) {
    Event.get(req.context, req.params.event)
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

  app.get('/api/events', cacheMiddleware.find, getAll);
  app.get('/api/events/:event', get);
  app.post('/api/events/:event', post);
  app.put('/api/events/:event', put);
  app.patch('/api/events/:event', patch);
  app.delete('/api/events/:event', del);
};

module.exports = buildEventEndpoint;
