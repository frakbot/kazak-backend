'use strict';

var Room = require('./../model/Room');

var getAll = function(req, res, next) {
  Room.getAll()
    .then(function(data) {
      res.send(data);
    }, next);
};

var get = function(req, res, next) {
  return Room.get(req.params.room)
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
  app.get('/api/rooms', getAll);
  app.get('/api/rooms/:room', get);
  app.post('/api/rooms/:room', post);
  app.put('/api/rooms/:room', put);
  app.patch('/api/rooms/:room', patch);
  app.delete('/api/rooms/:room', del);
};
