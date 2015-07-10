'use strict';

var Presenter = require('./../model/Presenter');

var getAll = function(req, res, next) {
  Presenter.getAll()
    .then(function(data) {
      res.send(data);
    }, next);
};

var get = function(req, res, next) {
  return Presenter.get(req.params.presenter)
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

module.exports = function(app) {
  app.get('/api/presenters', getAll);
  app.get('/api/presenters/:presenter', get);
  app.post('/api/presenters/:presenter', post);
  app.put('/api/presenters/:presenter', put);
  app.patch('/api/presenters/:presenter', patch);
  app.delete('/api/presenters/:presenter', del);
};
