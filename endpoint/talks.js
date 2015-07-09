'use strict';

var Talk = require('./../model/Talk');

var getAll = function(req, res) {
  Talk.getAll()
    .then(function(data) {
      res.send(data);
    });
};

var get = function(req, res, next) {
  // TODO
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
  app.get('/api/talks', getAll);
  app.get('/api/talks/:talk', get);
  app.post('/api/talks/:talk', post);
  app.put('/api/talks/:talk', put);
  app.patch('/api/talks/:talk', patch);
  app.delete('/api/talks/:talk', del);
};
