'use strict';

var buildPresenterEndpoint = function(app) {
  var Presenter = require('./../model/Presenter');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  var getAll = function(req, res) {
    Presenter.getAll(req.context)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var get = function(req, res) {
    return Presenter.get(req.context, req.params.presenter)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var post = function(req, res) {
    // TODO
  };

  var put = function(req, res) {
    // TODO
  };

  var patch = function(req, res) {
    // TODO
  };

  var del = function(req, res) {
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
