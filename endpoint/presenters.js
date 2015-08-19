'use strict';

var buildPresenterEndpoint = function(app) {
  var Presenter = require('./../model/Presenter');

  var getAll = function(req, res, next) {
    Presenter.getAll(req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var get = function(req, res, next) {
    return Presenter.get(req.params.presenter, req.dataLayer)
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

  app.get('/api/presenters', getAll);
  app.get('/api/presenters/:presenter', get);
  app.post('/api/presenters/:presenter', post);
  app.put('/api/presenters/:presenter', put);
  app.patch('/api/presenters/:presenter', patch);
  app.delete('/api/presenters/:presenter', del);
};

module.exports = buildPresenterEndpoint;
